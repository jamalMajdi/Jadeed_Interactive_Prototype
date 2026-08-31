import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff, Pencil, Plus, RotateCcw, Trash2 } from 'lucide-react'
import { StatusBar, ProductIcon, tileCls, fadeUp } from '../ui/kit.jsx'
import MerchantNav from '../ui/mnav.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'
import { fmt } from '../data/db.js'
import { PRODUCT_STATUS } from '../data/merchant.js'

/* B-10 — قائمة المنتجات: تبويبات الحالة + أزرار انتقالات الحالة الحية (V3) */
export default function B10() {
  const { go } = useNav()
  const { products, publish, hide, restore } = useMStore()
  const [tab, setTab] = useState('all')

  const counts = {
    all: products.length,
    active: products.filter((p) => p.status === 'active').length,
    draft: products.filter((p) => p.status === 'draft').length,
    hidden: products.filter((p) => p.status === 'hidden').length,
  }
  const list = tab === 'all' ? products : products.filter((p) => p.status === tab)

  const TABS = [
    { id: 'all', label: 'الكل' },
    { id: 'active', label: 'المنشورة' },
    { id: 'draft', label: 'المسودات' },
    { id: 'hidden', label: 'المخفية' },
  ]

  return (
    <div className="flex h-full flex-col bg-jadeed-bg">
      <div className="relative z-10 border-b border-jadeed-line bg-white px-5 pb-3.5 pt-3">
        <StatusBar />
        <div className="mt-2 flex items-center justify-between">
          <h1 className="text-lg font-extrabold">منتجاتي</h1>
          <button
            onClick={() => go('b11')}
            className="flex items-center gap-1 rounded-xl bg-jadeed-orange px-3 py-2 text-[11px] font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light"
          >
            <Plus size={14} strokeWidth={2.6} /> منتج جديد
          </button>
        </div>
        {/* تبويبات الحالة (V3: مسودات/مخفية) */}
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold transition ${tab === t.id ? 'bg-jadeed-purple text-white shadow-soft' : 'bg-jadeed-bg text-jadeed-muted hover:text-jadeed-purple'}`}
            >
              {t.label} <span className={tab === t.id ? 'text-white/70' : 'text-jadeed-ghost'}>({counts[t.id]})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="no-scrollbar grow overflow-y-auto px-4 pb-4 pt-4">
        <motion.ul layout className="space-y-2.5">
          <AnimatePresence mode="popLayout">
            {list.map((p) => {
              const st = PRODUCT_STATUS[p.status]
              return (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                  className="flex items-center gap-3 rounded-2xl border border-jadeed-line bg-white p-3 shadow-soft"
                >
                  <button onClick={() => go('b12')} className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${tileCls(0)}`}>
                    <ProductIcon name={p.icon} size={24} />
                  </button>
                  <button onClick={() => go('b12')} className="min-w-0 grow text-start">
                    <p className="truncate text-xs font-extrabold">{p.name}</p>
                    <p className="text-[10px] text-jadeed-muted">
                      {fmt(p.price)} / {p.unit} · مخزون {p.stock} · بيع {p.sold}
                    </p>
                    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-extrabold ${st.cls}`}>{st.label}</span>
                  </button>

                  {/* أزرار انتقالات الحالة — حية */}
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <button onClick={() => go('b13')} className="rounded-lg p-1.5 text-jadeed-ghost transition hover:bg-jadeed-red-tint hover:text-jadeed-red" title="حذف">
                      <Trash2 size={14} />
                    </button>
                    {p.status === 'draft' && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => publish(p.id, p.name)}
                        className="rounded-full bg-jadeed-purple px-3 py-1.5 text-[10px] font-extrabold text-white shadow-soft transition hover:bg-jadeed-purple-light"
                      >
                        نشر
                      </motion.button>
                    )}
                    {p.status === 'active' && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => hide(p.id, p.name)}
                        className="flex items-center gap-1 rounded-full border border-jadeed-line bg-white px-3 py-1.5 text-[10px] font-extrabold text-jadeed-muted transition hover:border-jadeed-yellow/50 hover:text-jadeed-yellow-dark"
                      >
                        <EyeOff size={11} /> إخفاء
                      </motion.button>
                    )}
                    {p.status === 'hidden' && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => restore(p.id, p.name)}
                        className="flex items-center gap-1 rounded-full bg-jadeed-yellow-tint px-3 py-1.5 text-[10px] font-extrabold text-jadeed-yellow-dark transition hover:shadow-soft"
                      >
                        <RotateCcw size={11} /> استعادة
                      </motion.button>
                    )}
                  </div>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>

        {list.length === 0 && (
          <div className="flex h-56 flex-col items-center justify-center gap-2 text-center">
            <Eye size={30} className="text-jadeed-ghost" />
            <p className="text-xs font-extrabold">لا منتجات في هذا التصنيف</p>
            <p className="text-[11px] text-jadeed-muted">بدّل التبويب أو أضف منتجًا جديدًا</p>
          </div>
        )}

        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-4 rounded-xl bg-jadeed-tint px-3 py-2 text-[10px] leading-4 text-jadeed-purple">
          انتقالات الحالة (V3): نشر → publishProduct · إخفاء → hideProduct · استعادة → restoreProduct — مع Toast تأكيد لكل عملية
        </motion.p>
      </div>

      <MerchantNav active="products" />
    </div>
  )
}
