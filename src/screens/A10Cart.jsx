import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react'
import { StatusBar, ProductIcon, tileCls, fadeUp, BottomNav, EmptyState } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'
import { cartItems as SEED, DELIVERY_FEE, fmt } from '../data/db.js'

export default function A10({ state = 'default' }) {
  const { go } = useNav()
  const { toast } = useMStore()
  const [items, setItems] = useState(SEED)

  const setQty = (id, d) =>
    setItems((p) => p.map((it) => (it.id === id ? { ...it, qty: Math.max(1, Math.min(9, it.qty + d)) } : it)))
  const remove = (id) => setItems((p) => p.filter((it) => it.id !== id))

  if (state === 'empty' || items.length === 0) {
    return (
      <div className="flex h-full flex-col bg-jadeed-bg">
        <div className="relative z-10 border-b border-jadeed-line bg-white px-5 pb-4 pt-3">
          <StatusBar />
          <div className="mt-2 flex items-center gap-3">
            <button onClick={() => go('a06')} className="rounded-full bg-jadeed-bg p-2 text-jadeed-black">
              <ChevronRight size={18} />
            </button>
            <h1 className="text-lg font-extrabold">السلة</h1>
          </div>
        </div>
        <div className="grow">
          <EmptyState
            icon={ShoppingCart}
            tone="purple"
            title="سلتك فارغة"
            sub="تصفح المتاجر القريبة وأضف ما تحتاجه — سلتك تنتظرك"
          >
            <button
              onClick={() => go('a06')}
              className="mt-2 flex items-center gap-2 rounded-2xl bg-jadeed-orange px-6 py-3 text-xs font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light"
            >
              <ArrowLeft size={15} /> ابدأ التسوق
            </button>
          </EmptyState>
        </div>
        <BottomNav active="cart" />
      </div>
    )
  }

  const subtotal = items.reduce((a, it) => a + it.price * it.qty, 0)
  const total = subtotal + DELIVERY_FEE
  const count = items.reduce((a, it) => a + it.qty, 0)

  return (
    <div className="flex h-full flex-col bg-jadeed-bg">
      <div className="relative z-10 border-b border-jadeed-line bg-white px-5 pb-4 pt-3">
        <StatusBar />
        <div className="mt-2 flex items-center gap-3">
          <button onClick={() => go('a06')} className="rounded-full bg-jadeed-bg p-2 text-jadeed-black">
            <ChevronRight size={18} />
          </button>
          <h1 className="text-lg font-extrabold">السلة</h1>
          <span className="rounded-full bg-jadeed-tint px-2.5 py-1 text-[11px] font-extrabold text-jadeed-purple">{count} عناصر</span>
          <button
            onClick={() => { setItems([]); toast('أُفرغت السلة بالكامل', 'info') }}
            className="mr-auto flex items-center gap-1 rounded-full bg-jadeed-red-tint px-3 py-1.5 text-[10px] font-extrabold text-jadeed-red transition hover:shadow-soft"
          >
            <Trash2 size={12} /> إفراغ السلة
          </button>
        </div>
      </div>

      <div className="no-scrollbar grow overflow-y-auto px-4 pb-4 pt-4">
        {/* مجموعة المتجر */}
        <p className="mb-2.5 text-[11px] font-extrabold text-jadeed-muted">من متجر <span className="text-jadeed-purple">بقالة النور</span></p>

        <div className="space-y-2.5">
          {items.map((it, i) => (
            <motion.div
              key={it.id}
              layout
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={i}
              className="flex items-center gap-3 rounded-2xl border border-jadeed-line bg-white p-3 shadow-soft"
            >
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${tileCls(i)}`}>
                <ProductIcon name={it.icon} size={24} />
              </div>
              <div className="min-w-0 grow">
                <p className="truncate text-xs font-extrabold">{it.name}</p>
                <p className="text-[11px] text-jadeed-muted">{fmt(it.price)} / {it.unit}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <button onClick={() => setQty(it.id, -1)} className="flex h-6 w-6 items-center justify-center rounded-full border border-jadeed-line bg-white text-jadeed-purple">
                    <Minus size={12} strokeWidth={2.6} />
                  </button>
                  <span className="w-4 text-center text-xs font-extrabold">{it.qty}</span>
                  <button onClick={() => setQty(it.id, 1)} className="flex h-6 w-6 items-center justify-center rounded-full border border-jadeed-line bg-white text-jadeed-purple">
                    <Plus size={12} strokeWidth={2.6} />
                  </button>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <button onClick={() => remove(it.id)} className="rounded-lg p-1.5 text-jadeed-ghost transition hover:bg-jadeed-red-tint hover:text-jadeed-red">
                  <Trash2 size={15} />
                </button>
                <p className="text-xs font-extrabold">{fmt(it.price * it.qty)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* الملخص */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={items.length} className="mt-4 rounded-2xl border border-jadeed-line bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between text-xs text-jadeed-muted">
            <span>مجموع المنتجات</span><span className="font-bold text-jadeed-black">{fmt(subtotal)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-jadeed-muted">
            <span>رسوم التوصيل</span><span className="font-bold text-jadeed-black">{fmt(DELIVERY_FEE)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-dashed border-jadeed-line pt-3">
            <span className="text-xs font-extrabold">الإجمالي</span>
            <span className="text-base font-extrabold text-jadeed-purple">{fmt(total)}</span>
          </div>
        </motion.div>
      </div>

      {/* شريط المتابعة */}
      <div className="z-10 border-t border-jadeed-line bg-white p-4 shadow-card">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => go('a11')}
          className="w-full rounded-2xl bg-jadeed-orange py-3.5 text-sm font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light"
        >
          متابعة الشراء · {fmt(total)}
        </motion.button>
      </div>

      <BottomNav active="cart" />
    </div>
  )
}
