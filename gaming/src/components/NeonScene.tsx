import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function createWindowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 256
  const context = canvas.getContext('2d')
  if (!context) return null

  context.fillStyle = '#111422'
  context.fillRect(0, 0, canvas.width, canvas.height)
  const colors = ['#5ff7ff', '#ff5caa', '#ffc879', '#7789ff']
  for (let row = 0; row < 12; row += 1) {
    for (let column = 0; column < 5; column += 1) {
      if (Math.random() > 0.34) {
        context.globalAlpha = 0.45 + Math.random() * 0.55
        context.fillStyle = colors[Math.floor(Math.random() * colors.length)]
        context.fillRect(8 + column * 23, 8 + row * 21, 9, 12)
      }
    }
  }
  context.globalAlpha = 1
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function makePalm(x: number, z: number, scale: number, color: number) {
  const palm = new THREE.Group()
  palm.position.set(x, 0, z)
  palm.scale.setScalar(scale)

  const trunkPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.05, 1.2, 0),
    new THREE.Vector3(-0.08, 2.4, 0),
    new THREE.Vector3(0.18, 3.45, 0),
  ])
  palm.add(new THREE.Mesh(
    new THREE.TubeGeometry(trunkPath, 16, 0.07, 7, false),
    new THREE.MeshStandardMaterial({ color: 0x261a39, emissive: 0x521f57, emissiveIntensity: 1.2 }),
  ))

  const leafMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85 })
  const crown = new THREE.Vector3(0.18, 3.45, 0)
  for (let index = 0; index < 9; index += 1) {
    const angle = (index / 9) * Math.PI * 2
    const reach = 1.25 + (index % 3) * 0.14
    const end = new THREE.Vector3(Math.cos(angle) * reach, 2.9, Math.sin(angle) * reach)
    const mid = new THREE.Vector3(Math.cos(angle) * reach * 0.52, 3.85 + (index % 2) * 0.15, Math.sin(angle) * reach * 0.52)
    const path = new THREE.CatmullRomCurve3([crown, mid, end])
    palm.add(new THREE.Mesh(new THREE.TubeGeometry(path, 12, 0.022, 5, false), leafMaterial))
    for (const side of [-1, 1]) {
      const rib = new THREE.Vector3(
        Math.cos(angle + side * 0.5) * reach * 0.68,
        3.2,
        Math.sin(angle + side * 0.5) * reach * 0.68,
      )
      const ribPath = new THREE.CatmullRomCurve3([mid, rib, end])
      palm.add(new THREE.Mesh(new THREE.TubeGeometry(ribPath, 7, 0.012, 4, false), leafMaterial))
    }
  }
  return palm
}

export default function NeonScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(49, 1, 0.1, 180)
    camera.position.set(0, 5.2, 17)
    camera.lookAt(0, 3.2, -7)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    mount.appendChild(renderer.domElement)

    const city = new THREE.Group()
    scene.add(city)
    const windowMap = createWindowTexture()
    const buildingMaterial = new THREE.MeshStandardMaterial({
      color: 0x737694,
      emissive: 0x6f225d,
      emissiveMap: windowMap ?? undefined,
      emissiveIntensity: 1.25,
      map: windowMap ?? undefined,
      roughness: 0.82,
      metalness: 0.16,
    })
    const buildingGeometry = new THREE.BoxGeometry(1, 1, 1)
    const buildings: { x: number; y: number; z: number; width: number; height: number; depth: number }[] = []
    let seed = 8417
    const random = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }
    for (const row of [-1, 1]) {
      for (let index = 0; index < 28; index += 1) {
        const x = (index - 13.5) * 1.75 + (random() - 0.5) * 0.6
        const width = 0.75 + random() * 0.78
        const height = 2.4 + random() * 7.3
        const depth = 0.65 + random() * 1.3
        buildings.push({ x, y: height / 2, z: row * (5.5 + random() * 5), width, height, depth })
      }
    }
    const blocks = new THREE.InstancedMesh(buildingGeometry, buildingMaterial, buildings.length)
    const matrix = new THREE.Matrix4()
    buildings.forEach(({ x, y, z, width, height, depth }, index) => {
      matrix.compose(
        new THREE.Vector3(x, y - 0.3, z),
        new THREE.Quaternion(),
        new THREE.Vector3(width, height, depth),
      )
      blocks.setMatrixAt(index, matrix)
    })
    city.add(blocks)

    const accentMaterial = new THREE.MeshBasicMaterial({ color: 0xff4f9c, transparent: true, opacity: 0.78 })
    const roofGeometry = new THREE.BoxGeometry(1, 0.025, 0.035)
    const roofs = new THREE.InstancedMesh(roofGeometry, accentMaterial, 36)
    let roofIndex = 0
    buildings.forEach(({ x, z, width, height, depth }, index) => {
      if (index % 3 !== 0) return
      matrix.compose(
        new THREE.Vector3(x, height - 0.25, z),
        new THREE.Quaternion(),
        new THREE.Vector3(width * 0.8, 1, depth * 0.7),
      )
      roofs.setMatrixAt(roofIndex, matrix)
      roofIndex += 1
    })
    roofs.count = roofIndex
    city.add(roofs)

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(120, 80),
      new THREE.MeshBasicMaterial({ color: 0x080a14, transparent: true, opacity: 0.86 }),
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.set(0, -0.33, -12)
    city.add(ground)

    const grid = new THREE.GridHelper(100, 48, 0x5deeff, 0x472657)
    grid.position.set(0, -0.29, -9)
    const gridMaterial = grid.material as THREE.Material
    gridMaterial.transparent = true
    gridMaterial.opacity = 0.24
    city.add(grid)

    const sunCanvas = document.createElement('canvas')
    sunCanvas.width = 512
    sunCanvas.height = 512
    const sunContext = sunCanvas.getContext('2d')
    if (sunContext) {
      const gradient = sunContext.createLinearGradient(0, 0, 0, 512)
      gradient.addColorStop(0, '#ffca85')
      gradient.addColorStop(0.48, '#ff699e')
      gradient.addColorStop(1, '#a835bf')
      sunContext.fillStyle = gradient
      sunContext.beginPath()
      sunContext.arc(256, 256, 235, 0, Math.PI * 2)
      sunContext.fill()
      sunContext.globalCompositeOperation = 'destination-out'
      for (let y = 300; y < 480; y += 27) {
        sunContext.fillRect(0, y, 512, 9 + (y - 300) * 0.045)
      }
      sunContext.globalCompositeOperation = 'source-over'
    }
    const sunTexture = new THREE.CanvasTexture(sunCanvas)
    sunTexture.colorSpace = THREE.SRGBColorSpace
    const sun = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.MeshBasicMaterial({ map: sunTexture, transparent: true, depthWrite: false, side: THREE.DoubleSide }),
    )
    sun.position.set(6.2, 8, -28)
    city.add(sun)

    city.add(makePalm(-10.5, -2.5, 1.55, 0xff63aa))
    city.add(makePalm(10.2, -1, 1.85, 0x7ef5ff))

    const starPositions = new Float32Array(330 * 3)
    for (let index = 0; index < 330; index += 1) {
      starPositions[index * 3] = (random() - 0.5) * 65
      starPositions[index * 3 + 1] = 2 + random() * 20
      starPositions[index * 3 + 2] = -30 + random() * 25
    }
    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: 0xc4eaff, size: 0.08, transparent: true, opacity: 0.75, sizeAttenuation: true }),
    )
    scene.add(stars)

    scene.add(new THREE.HemisphereLight(0xb5d9ff, 0x170d2b, 1.8))
    const pinkLight = new THREE.PointLight(0xff398b, 35, 42)
    pinkLight.position.set(-8, 5, 2)
    scene.add(pinkLight)
    const cyanLight = new THREE.PointLight(0x36eaff, 30, 38)
    cyanLight.position.set(8, 5, 0)
    scene.add(cyanLight)

    let frame = 0
    let pointerX = 0
    let pointerY = 0
    let targetX = 0
    let targetY = 0
    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
    }
    const onPointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 0.5
      targetY = (event.clientY / window.innerHeight - 0.5) * 0.2
    }
    const animate = () => {
      frame = window.requestAnimationFrame(animate)
      pointerX += (targetX - pointerX) * 0.02
      pointerY += (targetY - pointerY) * 0.02
      camera.position.x = pointerX
      camera.position.y = 5.2 - pointerY
      camera.lookAt(pointerX * 0.6, 3.2, -7)
      sun.position.x = pointerX * 1.6
      renderer.render(scene, camera)
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    animate()

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      buildingGeometry.dispose()
      buildingMaterial.dispose()
      windowMap?.dispose()
      roofGeometry.dispose()
      accentMaterial.dispose()
      ground.geometry.dispose()
      ground.material.dispose()
      grid.geometry.dispose()
      gridMaterial.dispose()
      sun.geometry.dispose()
      sun.material.dispose()
      sunTexture.dispose()
      starGeometry.dispose()
      stars.material.dispose()
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh && object.parent !== city) {
          object.geometry.dispose()
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
          else object.material.dispose()
        }
      })
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[.9]" />
}
