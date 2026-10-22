---
title: Aura Arena
description: Setup and deployment guide for the Aura Arena Vite application
---

## Aura Arena

Aura Arena is a Vite, React, and TypeScript frontend. Vercel builds the app into
the `dist` directory and serves it as a static site.

## Run locally

Install Node.js, then run these commands from the project directory:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite, usually <http://localhost:5173>.

To verify a production build locally:

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this project to a GitHub, GitLab, or Bitbucket repository. Include
   `package.json` and `package-lock.json`; do not commit `node_modules` or
   `dist`.
2. Sign in to <https://vercel.com>, choose **Add New Project**, and import the
   repository.
3. Keep the project settings from `vercel.json`: Vite framework,
   `npm run build`, and `dist` as the output directory.
4. Select **Deploy**. Vercel will build the app and provide a hosted URL.

The Vercel rewrite sends client-side routes to the app entry page. Pushes to the
connected production branch trigger new deployments.

## Dependencies and configuration

JavaScript dependencies are declared in `package.json` and locked in
`package-lock.json`. This project does not use Python, so it does not need a
`requirements.txt` file.

The booking checkout and launch-alert form are front-end demonstrations. They
do not process payments or send email, and no Vercel environment variables are
required for the current app.
