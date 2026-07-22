import { PNG } from 'pngjs'
import jsQR from 'jsqr'
import { readFileSync } from 'node:fs'
for (const f of ['surur-qr-cover.png','surur-qr-plain.png']) {
  const png = PNG.sync.read(readFileSync(f))
  const res = jsQR(new Uint8ClampedArray(png.data), png.width, png.height)
  console.log(f, '=>', res ? JSON.stringify(res.data) : 'DECODE FAILED')
}
