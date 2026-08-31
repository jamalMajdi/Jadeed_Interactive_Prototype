import { MapPin, Star } from 'lucide-react'
import { APage, ABadge } from '../../ui/ashell.jsx'
import { SEED_MERCHANTS } from '../../data/admin.js'
import { fmt } from '../../data/db.js'
import { WEEK_REVENUE } from '../../data/merchant.js'

/* C-09 — نظرة عامة على التجار (كل التجار المسجلين) */
export default function C09() {
  const max = Math.max(...WEEK_REVENUE.map((w) => w.v))

  return (
    <APage title="نظرة عامة على التجار" sub="أداء المتاجر المنضمة إلى «جديد» — آخر ٧ أيام">
      <div className="grid gap-4 lg:grid-cols-3">
        {SEED_MERCHANTS.map((m) => (
          <div key={m.store} className="rounded-2xl border border-jadeed-line bg-white p-4 shadow-soft transition hover:shadow-pop">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-extrabold">{m.store}</p>
                <p className="text-[10px] text-jadeed-muted">{m.owner} · منذ {m.since}</p>
              </div>
              {m.status === 'active' ? <ABadge tone="ok">نشط</ABadge> : <ABadge tone="warn">قيد الإعداد</ABadge>}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[
                ['التقييم', `${m.rating} ★`],
                ['المنتجات', m.products],
                ['الطلبات', m.orders],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-jadeed-bg p-2">
                  <p className="text-xs font-extrabold">{v}</p>
                  <p className="text-[9px] font-bold text-jadeed-muted">{k}</p>
                </div>
              ))}
            </div>
            <p className="mt-2.5 flex items-center gap-1 text-[10px] font-bold text-jadeed-muted">
              <MapPin size={11} className="text-jadeed-purple" /> عدن — {m.city}
            </p>
          </div>
        ))}

        {/* ملخص المنصة */}
        <div className="rounded-2xl border border-jadeed-line bg-gradient-to-br from-jadeed-purple to-jadeed-purple-light p-4 text-white shadow-pop lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold">إيراد المنصة — آخر ٧ أيام</p>
              <p className="mt-1 text-2xl font-extrabold">{fmt(214500)}</p>
            </div>
            <div className="flex h-16 flex-1 items-end justify-end gap-1.5" dir="ltr">
              {WEEK_REVENUE.map((w, i) => (
                <div key={w.d} className={`w-4 rounded-t-md ${i === WEEK_REVENUE.length - 1 ? 'bg-jadeed-orange' : 'bg-white/25'}`} style={{ height: `${(w.v / max) * 56}px` }} />
              ))}
            </div>
            <div className="text-end">
              <p className="text-[10px] text-white/70">عمولة المنصة (٥٪)</p>
              <p className="text-lg font-extrabold text-jadeed-yellow">{fmt(10725)}</p>
            </div>
          </div>
        </div>
      </div>
    </APage>
  )
}
