import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Store as StoreIcon, Clock, Plus } from 'lucide-react'
import { StatusBar, RatingChip, ProductIcon, tileCls, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useAStore } from '../ui/astore.jsx'
import { products, fmt } from '../data/db.js'

export default function A07({ state = 'default' }) {
  const { go } = useNav()
  const { cats } = useAStore()
  const [cat, setCat] = useState('الكل')
  const empty = state === 'empty'

  const CATS = ['الكل', ...cats.map((c) => c.name)] // حية من إدارة الفئات C-18 ★
  const list = products.filter((p) => p.store === 'بقالة النور').filter((p) => cat === 'الكل' || p.cat === cat)

  return (
    <div className="flex h-full flex-col bg-jadeed-bg">
      {/* غلاف المتجر */}
      <div className="relative z-10 bg-gradient-to-b from-jadeed-purple to-jadeed-purple-light px-5 pb-12 pt-3 text-white">
        <StatusBar light />
        <div className="mt-2 flex items-center gap-3">
          <button onClick={() => go('a06')} className="rounded-full bg-white/15 p-2 transition hover:bg-white/25">
            <ChevronRight size={18} />
          </button>
          <p className="text-xs text-white/75">متجر</p>
        </div>
      </div>

      <div className="no-scrollbar relative z-20 -mt-6 grow overflow-y-auto px-4 pb-6">
        {/* كارت معلومات المتجر */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="rounded-2xl border border-jadeed-line bg-white p-4 shadow-card">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-base font-extrabold">بقالة النور</h1>
            <RatingChip value={4.5} />
          </div>
          <p className="mt-0.5 text-xs text-jadeed-muted">خضار وفواكه طازجة · 1.2 كم</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-jadeed-tint px-2.5 py-1 text-[11px] font-bold text-jadeed-purple">
              <span className="h-1.5 w-1.5 rounded-full bg-jadeed-purple" /> مفتوح الآن
            </span>
            <span className="flex items-center gap-1 rounded-full bg-jadeed-gray px-2.5 py-1 text-[11px] font-bold text-jadeed-muted">
              <Clock size={11} /> التوصيل ~١٥ د
            </span>
          </div>
        </motion.div>

        {empty ? (
          <div className="flex h-72 flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-jadeed-tint text-jadeed-purple">
              <StoreIcon size={38} strokeWidth={1.6} />
            </div>
            <h3 className="text-base font-extrabold">لا توجد منتجات منشورة بعد</h3>
            <p className="text-xs leading-6 text-jadeed-muted">يعرض هذا القسم منتجات المتجر فور نشرها (حالة A-07 الفارغة)</p>
          </div>
        ) : (
          <>
            {/* تصنيفات */}
            <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold transition ${cat === c ? 'bg-jadeed-purple text-white shadow-pop' : 'border border-jadeed-line bg-white text-jadeed-muted hover:text-jadeed-purple'}`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* شبكة المنتجات */}
            {list.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-jadeed-line bg-white p-6 text-center">
                <p className="text-xs font-extrabold">لا توجد منتجات في تصنيف «{cat}» بعد</p>
                <p className="mt-1 text-[11px] text-jadeed-muted">جرّب تصنيفًا آخر — المتجر يضيف منتجاته تدريجيًا</p>
              </div>
            ) : (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {list.map((p, i) => (
                <motion.button
                  key={p.id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  custom={i}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => go(p.stock ? 'a08' : 'a08o')}
                  className={`relative rounded-2xl border border-jadeed-line bg-white p-3 text-start shadow-soft transition hover:shadow-pop ${p.stock ? '' : 'opacity-70'}`}
                >
                  <div className={`relative flex h-24 items-center justify-center rounded-xl ${tileCls(i)}`}>
                    <ProductIcon name={p.icon} size={34} />
                    {!p.stock && (
                      <span className="absolute inset-x-2 bottom-2 rounded-lg bg-jadeed-black/80 py-1 text-center text-[9px] font-bold text-white">
                        غير متوفر حاليًا
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2.5 truncate text-xs font-extrabold">{p.name}</h3>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-xs font-extrabold text-jadeed-purple">{fmt(p.price)}</p>
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${p.stock ? 'bg-jadeed-orange shadow-soft' : 'bg-jadeed-ghost'}`}>
                      <Plus size={15} strokeWidth={2.4} />
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
