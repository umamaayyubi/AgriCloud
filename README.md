# AgriCloud

AgriCloud is a production-quality frontend-only agricultural storage management dashboard built with React + Vite.

## Features

- Add storage records
- Edit storage records
- Delete storage records
- Search and filter storage records
- Reset all local records
- Export and import records as JSON
- Summary cards for total records, total quantity, and total capacity
- Empty state with clear CTA
- Default starter data on first load
- Language persistence
- Theme persistence
- Responsive dashboard and mobile-friendly table behavior

## Tech Stack

- React
- Vite
- Plain CSS
- i18next
- react-i18next
- localStorage

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm install
npm run build
npm run preview
```

## Deployment

This project includes:

- Dockerfile
- nginx.conf
- Kubernetes manifests
- GitHub Actions CI/CD workflow

The production image uses a multi-stage Docker build that compiles the Vite app and serves the generated static files from NGINX, which is a common production pattern for frontend SPAs. SPA refresh handling is implemented at the NGINX layer through `try_files` fallback routing. 