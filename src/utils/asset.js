// Resolve a public-folder asset path against Vite's configured base URL so
// images work both locally (base "/") and on GitHub Pages (base "./<repo>/").
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`
