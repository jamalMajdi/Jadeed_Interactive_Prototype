import { Check } from 'lucide-react'
import { APage, ABadge } from '../../ui/ashell.jsx'
import { useNav } from '../../ui/nav.jsx'
import { SEED_ALL_ORDERS, TRACK_STEPS } from '../../data/admin.js'
import { fmt } from '../../data/db.js'

/* C-13 — تفاصيل تتبع طلب (Tracking Status) */
export default function C13() {
  const { go } = useNav()
  const o = SEED_ALL_ORDERS[1] // #1051 قيد التحضير
  const idx = TRACK_STEPS.indexOf('قيد التحضير')

  return (
    <APage
      title={`تتبع الطلب #${o.id}`}
      sub={`${o.customer} · ${o.store} · ${fmt(o.total)} — ${o.date}`}
      actions={<button onClick={() => go('c12')} className="rounded-xl border border-jadeed-line bg-white px-3.5 py-2 text-[11px] font-extrabold text-jadeed-muted transition hover:text-jadeed-purple">← كل الطلبات</button>}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-jadeed-line bg-white p-5 lg:col-span-2">
          <p className="mb-4 text-xs font-extrabold">مسار الحالة (State-Order)</p>
          <div className="space-y-0">
            {TRACK_STEPS.map((s, i) => {
              const done = i <= idx
              const now = i === idx
              return (
                <div key={s} className="relative flex items-center gap-3 pb-5 last:pb-0">
                  {i < TRACK_STEPS.length - 1 && (
                    <span className={`absolute right-[13px] top-7 h-[calc(100%-16px)] w-0.5 ${i < idx ? 'bg-jadeed-purple/40' : 'bg-jadeed-line'}`} />
                  )}
                  <span className={`z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${now ? 'bg-jadeed-orange text-white' : done ? 'bg-jadeed-purple text-white' : 'border-2 border-jadeed-line bg-white'}`}>
                    {done && <Check size={13} strokeWidth={3} />}
                  </span>
                  <div>
                    <p className={`text-xs ${now ? 'font-extrabold' : done ? 'font-bold' : 'font-bold text-jadeed-ghost'}`}>{s}</p>
                    {now && <p className="text-[10px] text-jadeed-muted">المرحلة الحالية — منذ ١٢ دقيقة</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-jadeed-line bg-white p-4">
            <p className="text-xs font-extrabold">أطراف الطلب</p>
            <div className="mt-2.5 space-y-2 text-[11px]">
              {[['العميل', o.customer], ['المتجر', o.store], ['المندوب', 'بانتظار الإسناد']].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="font-bold text-jadeed-muted">{k}</span>
                  <span className="font-extrabold">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-jadeed-line bg-white p-4">
            <p className="text-xs font-extrabold">الحالة المالية</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[11px] font-bold text-jadeed-muted">دفع عند الاستلام</span>
              <ABadge tone="warn">لم تُحصّل</ABadge>
            </div>
          </div>
        </div>
      </div>
    </APage>
  )
}
