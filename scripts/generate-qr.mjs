// Generate print-ready PNG QR codes for Surur Bakeries.
//  - surur-qr-cover.png : modern branded badge (QR + logo + website text) for covers
//  - surur-qr-plain.png : transparent QR + logo only (for designers)
// Run: node scripts/generate-qr.mjs
import QRCode from 'qrcode'
import { Resvg } from '@resvg/resvg-js'
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const URL_VALUE = 'https://www.surur-bakeries.com/qr.html'
const WEBSITE = 'www.Surur-bakeries.com'

const DARK = '#2a1710'
const RED = '#c8102e'
const GOLD = '#e6b24a'
const GREEN = '#2f9e4f'
const BROWN = '#4a2f1a'

// ---- QR matrix ----
const qr = QRCode.create(URL_VALUE, { errorCorrectionLevel: 'H' })
const N = qr.modules.size
const bits = qr.modules.data
const isDark = (x, y) => x >= 0 && y >= 0 && x < N && y < N && !!bits[y * N + x]

// Build rounded-module QR paths inside a box of `qrPx` starting at (ox, oy).
// Center is cleared (circle) to host the logo — safe under error-correction level H.
function qrPaths(qrPx, ox, oy, clearFrac = 0.22) {
  const m = qrPx / N
  const cx = ox + qrPx / 2
  const cy = oy + qrPx / 2
  const clearR = qrPx * (clearFrac / 2) + m * 0.6
  let d = ''
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (!isDark(x, y)) continue
      const px = ox + x * m
      const py = oy + y * m
      const mx = px + m / 2
      const my = py + m / 2
      if (Math.hypot(mx - cx, my - cy) <= clearR) continue // clear center for logo
      // Crisp, edge-to-edge square modules — most reliable for scanning in print.
      // A hair of overlap (0.5px) removes hairline seams from anti-aliasing.
      const o = 0.5
      d += `M${px - o},${py - o} h${m + 2 * o} v${m + 2 * o} h${-(m + 2 * o)} z `
    }
  }
  return { d, clearR, cx, cy }
}

// White circle + windmill logo mark centered at (cx, cy), scaled to radius r.
// Logo art is authored on a 64x64 grid (radius 32).
function logoMark(cx, cy, r) {
  const s = r / 32
  return `
    <g transform="translate(${cx - r},${cy - r}) scale(${s})">
      <circle cx="32" cy="32" r="31" fill="#ffffff"/>
      <circle cx="32" cy="32" r="27" fill="${RED}" stroke="${GOLD}" stroke-width="3"/>
      <path d="M25 45V32l7-6 7 6v13z" fill="#fff"/>
      <rect x="30" y="38" width="4" height="7" fill="${RED}"/>
      <g stroke="#fff" stroke-width="3" stroke-linecap="round">
        <line x1="32" y1="26" x2="20" y2="14"/>
        <line x1="32" y1="26" x2="44" y2="14"/>
        <line x1="32" y1="26" x2="20" y2="38"/>
        <line x1="32" y1="26" x2="44" y2="38"/>
      </g>
    </g>`
}

function render(svg, outName, scale = 2) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'zoom', value: scale },
    font: { loadSystemFonts: true },
    background: 'rgba(0,0,0,0)',
  })
  const png = resvg.render().asPng()
  const outDir = `${ROOT}public`
  mkdirSync(outDir, { recursive: true })
  writeFileSync(`${ROOT}${outName}`, png) // project root (easy to grab)
  writeFileSync(`${outDir}/${outName}`, png) // shipped with the site
  console.log(`✓ ${outName}  (${(png.length / 1024).toFixed(0)} KB, ${N}×${N} modules)`) }

// ============ 1) Cover badge ============
{
  const W = 1080
  const qrPx = 720
  const ox = (W - qrPx) / 2
  const oy = 250
  const { d, clearR, cx, cy } = qrPaths(qrPx, ox, oy, 0.2)
  const logoR = clearR * 0.92
  const H = 1380

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${RED}"/>
        <stop offset="0.5" stop-color="${GOLD}"/>
        <stop offset="1" stop-color="${GREEN}"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${W}" height="${H}" rx="56" fill="#ffffff"/>
    <rect x="0" y="0" width="${W}" height="18" rx="9" fill="url(#accent)"/>

    <text x="${W / 2}" y="120" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
      font-size="58" font-weight="800" fill="${RED}" letter-spacing="1">SURUR BAKERIES</text>
    <text x="${W / 2}" y="178" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
      font-size="30" font-weight="600" fill="${BROWN}" letter-spacing="6">LIGHT &amp; DIET · SINCE 1986</text>

    <rect x="${ox - 28}" y="${oy - 28}" width="${qrPx + 56}" height="${qrPx + 56}" rx="40"
      fill="#ffffff" stroke="${GOLD}" stroke-width="6"/>
    <path d="${d}" fill="${DARK}"/>
    ${logoMark(cx, cy, logoR)}

    <text x="${W / 2}" y="${oy + qrPx + 96}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
      font-size="30" font-weight="700" fill="${GREEN}" letter-spacing="8">SCAN ME</text>
    <text x="${W / 2}" y="${oy + qrPx + 172}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
      font-size="60" font-weight="800" fill="${RED}">${WEBSITE}</text>
    <rect x="${W / 2 - 130}" y="${oy + qrPx + 200}" width="260" height="6" rx="3" fill="${GOLD}"/>
  </svg>`
  render(svg, 'surur-qr-cover.png', 2)
}

// ============ 2) Plain transparent QR + logo ============
{
  const qrPx = 900
  const pad = Math.round((qrPx / N) * 4) // 4-module quiet zone (spec minimum)
  const S = qrPx + pad * 2
  const { d, clearR, cx, cy } = qrPaths(qrPx, pad, pad, 0.2)
  const logoR = clearR * 0.92
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <path d="${d}" fill="${DARK}"/>
    ${logoMark(cx, cy, logoR)}
  </svg>`
  render(svg, 'surur-qr-plain.png', 2)
}
