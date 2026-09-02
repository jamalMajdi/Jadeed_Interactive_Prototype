// اختبار دخان SSR — يرسم كل شاشة من الـ85 ويكشف أي انهيار وقت تشغيل
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

const server = await createServer({
  root: process.cwd(),
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom',
})

const { NavCtx } = await server.ssrLoadModule('/src/ui/nav.jsx')
const { MStoreProvider } = await server.ssrLoadModule('/src/ui/mstore.jsx')
const { AStoreProvider } = await server.ssrLoadModule('/src/ui/astore.jsx')
const { CartProvider } = await server.ssrLoadModule('/src/ui/cstore.jsx')
const { SCREENS } = await server.ssrLoadModule('/src/ui/registry.jsx')
const { MERCHANT_SCREENS } = await server.ssrLoadModule('/src/ui/registry_m.jsx')
const { ADMIN_SCREENS } = await server.ssrLoadModule('/src/ui/registry_a.jsx')

const all = [
  ...SCREENS.map((s) => ['A', s]),
  ...MERCHANT_SCREENS.map((s) => ['B', s]),
  ...ADMIN_SCREENS.map((s) => ['C', s]),
]

let ok = 0
const fails = []
for (const [app, s] of all) {
  try {
    const el = React.createElement(
      NavCtx.Provider,
      { value: { current: s, go: () => {}, list: [] } },
      React.createElement(
        CartProvider,
        null,
        React.createElement(
          AStoreProvider,
          null,
          React.createElement(MStoreProvider, null, React.createElement(s.Comp)),
        ),
      ),
    )
    const html = renderToString(el)
    if (!html || html.length < 60) throw new Error('empty render (' + (html || '').length + 'b)')
    ok++
  } catch (e) {
    fails.push(`${app} ${s.key} (${s.id}) → ${String(e.message || e).slice(0, 140)}`)
  }
}

console.log(`SSR SMOKE: ${ok} ok / ${fails.length} fail / ${all.length} total`)
fails.forEach((f) => console.log('  X ' + f))
await server.close()
process.exit(fails.length ? 1 : 0)
