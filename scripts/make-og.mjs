/**
 * Render the share card to public/og.png.
 *
 *   npm run og
 *
 * Builds nothing: it serves the app with `vite preview`, opens /og, waits for
 * the self-hosted fonts to settle, and captures the 1200×630 card element at
 * 2× for retina-sharp text. Run it after changing anything on the front page.
 */

import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import { createRequire } from 'node:module'
import { stat } from 'node:fs/promises'

const PORT = 51730
const URL = `http://127.0.0.1:${PORT}/og`
const OUT = 'public/og.jpg'

const require = createRequire(import.meta.url)

async function loadPlaywright() {
  const attempts = ['playwright', 'playwright-core']
  for (const name of attempts) {
    for (const specifier of [name, tryResolve(name)]) {
      if (!specifier) continue
      try {
        // A globally installed Playwright resolves to CJS, where the named
        // exports arrive on `default` instead of the namespace.
        const mod = await import(specifier)
        const chromium = mod.chromium || mod.default?.chromium
        if (chromium) return chromium
      } catch {
        /* try the next candidate */
      }
    }
  }
  console.error(
    'Playwright is needed to render the card:\n  npm i -D playwright && npx playwright install chromium',
  )
  return process.exit(1)
}

function tryResolve(name) {
  const roots = [process.env.NODE_PATH, '/opt/node22/lib/node_modules'].filter(Boolean)
  try {
    return require.resolve(name, { paths: roots })
  } catch {
    return null
  }
}

const chromium = await loadPlaywright()

const server = spawn(
  'npx',
  ['vite', 'preview', '--port', String(PORT), '--host', '127.0.0.1'],
  { stdio: 'ignore' },
)

const shutdown = () => server.kill()
process.on('exit', shutdown)
process.on('SIGINT', () => {
  shutdown()
  process.exit(130)
})

try {
  // Wait for the preview server to answer
  let ready = false
  for (let i = 0; i < 40 && !ready; i += 1) {
    try {
      const response = await fetch(URL)
      ready = response.ok
    } catch {
      await sleep(250)
    }
  }
  if (!ready) throw new Error(`preview server never came up on ${PORT} — is dist/ built?`)

  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
  })
  const page = await browser.newPage({
    viewport: { width: 1400, height: 900 },
    deviceScaleFactor: 2,
  })

  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await sleep(600)

  // JPEG, not PNG: this file is fetched by every chat client that unfurls the
  // link, and at quality 92 the difference is invisible for a fifth of the bytes.
  await page.locator('#social-card').screenshot({ path: OUT, quality: 92, type: 'jpeg' })
  const { size } = await stat(OUT)
  console.log(`wrote ${OUT} (1200×630 @2x, ${Math.round(size / 1024)} KB)`)

  await browser.close()
} finally {
  shutdown()
}
