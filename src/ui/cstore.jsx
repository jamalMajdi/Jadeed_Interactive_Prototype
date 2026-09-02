import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { cartItems as SEED } from '../data/db.js'

/* مخزن العميل: سلة تسوّق حية تبقى عبر التنقل بين الشاشات.
   الأساس التحليلي: UC-03 (Squad-3) إدارة السلة — شرط لاحق:
   «الاحتفاظ بمحتويات السلة حتى بعد إغلاق التطبيق».
   وACT_ManageCart: أضف → «display added cart» → عدّل الكمية/احذف → checkout.
   قاعدة «سلة لكل متجر» محفوظة: البذرة كلها من متجر واحد (بقالة النور). */

const CartCtx = createContext(null)

/* قيمة افتراضية آمنة (بذرة السلة) — تضمن عمل SSR والعرض دون Provider */
const FALLBACK = {
  items: SEED,
  count: SEED.reduce((a, it) => a + it.qty, 0),
  add: () => {},
  setQty: () => {},
  remove: () => {},
  clear: () => {},
}
export const useCart = () => useContext(CartCtx) || FALLBACK

export function CartProvider({ children }) {
  const [items, setItems] = useState(SEED)

  const add = useCallback((p, qty = 1) => {
    setItems((prev) => {
      const hit = prev.find((it) => it.id === p.id)
      if (hit) return prev.map((it) => (it.id === p.id ? { ...it, qty: Math.min(9, it.qty + qty) } : it))
      return [...prev, { id: p.id, name: p.name, store: p.store, price: p.price, qty, unit: p.unit, icon: p.icon }]
    })
  }, [])

  const setQty = useCallback((id, q) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, Math.min(9, q)) } : it)))
  }, [])

  const remove = useCallback((id) => setItems((prev) => prev.filter((it) => it.id !== id)), [])
  const clear = useCallback(() => setItems([]), [])

  const value = useMemo(
    () => ({ items, count: items.reduce((a, it) => a + it.qty, 0), add, setQty, remove, clear }),
    [items, add, setQty, remove, clear],
  )

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}
