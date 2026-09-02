import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, PackageOpen } from 'lucide-react'
import { StatusBar, BottomNav, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { orders, STATUS_META, fmt } from '../data/db.js'

const TABS = [
  { id: 'active', label: 'الجارية' },
  { id: 'done', label: 'المكتملة' },
  { id: 'cancelled', label: 'الملغاة/المرفوضة' },
]

const TAB_FILTER = {
  active: ['preparing', 'delivering'],
  done: ['delivered'],
  cancelled: ['cancelled', 'rejected'],
}

export default function A13() {
  const { go } = useNav()
  const [tab, setTab] = useState('active')
  const list = orders.filter((o) => TAB_FILTER[tab].includes(o.status))

  return (
    <div className="flex h-full flex-col bg-jadeed-bg">
      <div className="relative z-10 border-b border-jadeed-line bg-white px-5 pb-4 pt-3">
        <StatusBar />
        <h1 className="mt-2 text-lg font-extrabold">طلباتي</h1>
        {/* التبويبات */}
        <div className="mt-3 flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-3.5 py-1.5 text-[11px] font-extrabold transition ${tab === t.id ? 'bg-jadeed-purple text-white shadow-soft' : 'bg-jadeed-bg text-jadeed-muted hover:text-jadeed-purple'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="no-scrollbar grow overflow-y-auto px-4 pb-4 pt-4">
        <div className="space-y-3">
          {list.map((o, i) => {
            const meta = STATUS_META[o.status]
            const clickable = o.status !== 'cancelled'
            const dest = o.status === 'rejected' ? 'a14r' : 'a14'
            return (
              <motion.button
                key={o.id}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={i}
                whileHover={clickable ? { y: -2 } : undefined}
                onClick={clickable ? () => go(dest) : undefined}
                className={`w-full rounded-2xl border border-jadeed-line bg-white p-4 text-start shadow-soft transition ${clickable ? 'hover:shadow-pop' : 'cursor-default opacity-90'}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 text-sm font-extrabold">
                    <span dir="ltr" className="text-jadeed-purple">#{o.id}</span>
                    <span className="text-jadeed-black">· {o.store}</span>
                  </p>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${meta.cls}`}>{meta.label}</span>
                </div>
                <p className="mt-1 text-[11px] text-jadeed-muted">{o.date}</p>
                <p className="mt-2 rounded-xl bg-jadeed-bg px-3 py-2 text-[11px] font-bold text-jadeed-muted">{o.items}</p>
                <div className="mt-3 flex items-center justify-between border-t border-dashed border-jadeed-line pt-3">
                  <p className="text-sm font-extrabold">{fmt(o.total)}</p>
                  {clickable ? (
                    <span className="flex items-center gap-1 text-[11px] font-extrabold text-jadeed-purple">
                      تتبع الطلب <ChevronLeft size={14} />
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-jadeed-ghost">أُلغي قبل التجهيز</span>
                  )}
                </div>
              </motion.button>
            )
          })}
          {list.length === 0 && (
            <div className="flex flex-col items-center gap-2.5 pb-6 pt-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-jadeed-tint text-jadeed-purple">
                <PackageOpen size={30} strokeWidth={1.6} />
              </div>
              <p className="text-sm font-extrabold">لا توجد طلبات في هذا التصنيف</p>
              <p className="max-w-56 text-xs leading-5 text-jadeed-muted">عند إرسال طلبك سيظهر هنا مع حالته لحظة بلحظة</p>
              <button
                onClick={() => go('a06')}
                className="mt-1 rounded-2xl bg-jadeed-orange px-5 py-2.5 text-[11px] font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light"
              >
                ابدأ التسوق
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNav active="orders" />
    </div>
  )
}
