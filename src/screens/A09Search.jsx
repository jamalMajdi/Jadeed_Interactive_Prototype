import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Search, SearchX, X, PenLine, SlidersHorizontal } from 'lucide-react'
import { StatusBar, ProductIcon, tileCls, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { products, fmt } from '../data/db.js'

const SUGGEST = ['طماطم', 'بندورة', 'حليب', 'كرواسان']

export default function A09({ state = 'default' }) {
  const { go } = useNav()
  const [q, setQ] = useState(state === 'none' ? 'أرز بسمتي' : '')
  const [sort, setSort] = useState('near')

  const query = q.trim()
  /* البحث بالاسم + الوصف + الكلمات العامية (UC-02) */
  const hits = query
    ? products.filter((p) => p.name.includes(query) || p.desc.includes(query) || (p.syn && p.syn.includes(query)))
    : []
  const results = sort === 'cheap' ? [...hits].sort((a, b) => a.price - b.price) : hits

  return (
    <div className="flex h-full flex-col bg-white">
      {/* رأس البحث */}
      <div className="relative z-10 bg-gradient-to-b from-jadeed-purple to-jadeed-purple-light px-5 pb-7 pt-3 text-white">
        <StatusBar light />
        <div className="mt-2 flex items-center gap-2.5">
          <button onClick={() => go('a06')} className="rounded-full bg-white/15 p-2 transition hover:bg-white/25">
            <ChevronRight size={18} />
          </button>
          <div className="flex grow items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-card">
            <Search size={17} className="shrink-0 text-jadeed-ghost" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث عن منتج…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-jadeed-ghost"
            />
            {q && (
              <button onClick={() => setQ('')} className="shrink-0 rounded-full bg-jadeed-gray p-1 text-jadeed-muted">
                <X size={12} strokeWidth={2.6} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="no-scrollbar relative z-20 -mt-3 grow overflow-y-auto rounded-t-3xl bg-white px-5 pb-6 pt-5">
        {/* حالة A-09e: كلمة فارغة */}
        {state === 'emptykw' && !query && (
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-5 rounded-2xl border border-jadeed-line bg-jadeed-bg p-4">
            <p className="flex items-center gap-2 text-xs font-extrabold">
              <PenLine size={15} className="text-jadeed-purple" /> اكتب كلمة للبحث أولًا
            </p>
            <p className="mt-1 text-[11px] leading-5 text-jadeed-muted">زر البحث معطّل حتى إدخال كلمة — تجنب طلبات بحث فارغة (A-09e)</p>
          </motion.div>
        )}

        {/* لا نتائج */}
        {query && results.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-jadeed-tint text-jadeed-purple">
              <SearchX size={38} strokeWidth={1.6} />
            </div>
            <h3 className="text-base font-extrabold">لا نتائج مطابقة لـ «{query}»</h3>
            <p className="text-xs leading-6 text-jadeed-muted">تحقق من الإملاء أو جرّب كلمات أعم — أو ابحث في متاجر أخرى قريبة</p>
            <button
              onClick={() => setQ('')}
              className="mt-2 rounded-2xl bg-jadeed-tint px-5 py-3 text-xs font-extrabold text-jadeed-purple transition hover:shadow-pop"
            >
              مسح البحث
            </button>
          </div>
        )}

        {/* نتائج */}
        {results.length > 0 && (
          <>
            <div className="mb-3 flex items-center gap-2">
              <p className="text-xs font-extrabold text-jadeed-muted">
                النتائج <span className="text-jadeed-purple">({results.length})</span>
              </p>
              <div className="mr-auto flex items-center gap-1.5">
                <button
                  onClick={() => setSort('near')}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold transition ${sort === 'near' ? 'bg-jadeed-tint text-jadeed-purple' : 'border border-jadeed-line text-jadeed-muted hover:text-jadeed-purple'}`}
                >
                  الأقرب أولًا
                </button>
                <button
                  onClick={() => setSort('cheap')}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold transition ${sort === 'cheap' ? 'bg-jadeed-tint text-jadeed-purple' : 'border border-jadeed-line text-jadeed-muted hover:text-jadeed-purple'}`}
                >
                  الأرخص أولًا
                </button>
                <button
                  onClick={() => go('a09b')}
                  title="التصفية والترتيب"
                  className="flex items-center gap-1 rounded-full border border-jadeed-line px-2.5 py-1 text-[10px] font-extrabold text-jadeed-muted transition hover:text-jadeed-purple"
                >
                  <SlidersHorizontal size={12} /> تصفية
                </button>
              </div>
            </div>
            <div className="space-y-2.5">
              {results.map((p, i) => (
                <motion.button
                  key={p.id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  custom={i}
                  whileHover={{ y: -1.5 }}
                  onClick={() => go(p.stock ? 'a08' : 'a08o')}
                  className="flex w-full items-center gap-3 rounded-2xl border border-jadeed-line bg-white p-2.5 text-start shadow-soft transition hover:border-[#D8C8F5] hover:shadow-pop"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tileCls(i)}`}>
                    <ProductIcon name={p.icon} size={22} />
                  </div>
                  <div className="min-w-0 grow">
                    <p className="truncate text-xs font-extrabold">{p.name}</p>
                    <p className="truncate text-[11px] text-jadeed-muted">{p.store} · للـ{p.unit}</p>
                  </div>
                  <p className="shrink-0 text-xs font-extrabold text-jadeed-purple">{fmt(p.price)}</p>
                </motion.button>
              ))}
            </div>
          </>
        )}

        {/* الاقتراحات (قبل الكتابة) */}
        {!query && state !== 'emptykw' && (
          <>
            <p className="mb-2.5 text-xs font-extrabold">الأكثر بحثًا في حيّك</p>
            <div className="flex flex-wrap gap-2">
              {SUGGEST.map((s) => (
                <button
                  key={s}
                  onClick={() => setQ(s)}
                  className="rounded-full border border-jadeed-line bg-jadeed-bg px-3.5 py-1.5 text-[11px] font-bold text-jadeed-muted transition hover:border-jadeed-purple hover:text-jadeed-purple"
                >
                  {s}
                </button>
              ))}
            </div>

            <p className="mb-3 mt-6 text-xs font-extrabold">منتجات مقترحة</p>
            <div className="space-y-2.5">
              {products.slice(0, 4).map((p, i) => (
                <motion.button
                  key={p.id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  custom={i}
                  onClick={() => go('a08')}
                  className="flex w-full items-center gap-3 rounded-2xl border border-jadeed-line bg-white p-2.5 text-start shadow-soft transition hover:shadow-pop"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tileCls(i)}`}>
                    <ProductIcon name={p.icon} size={22} />
                  </div>
                  <div className="min-w-0 grow">
                    <p className="truncate text-xs font-extrabold">{p.name}</p>
                    <p className="truncate text-[11px] text-jadeed-muted">{p.store}</p>
                  </div>
                  <p className="shrink-0 text-xs font-extrabold text-jadeed-purple">{fmt(p.price)}</p>
                </motion.button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
