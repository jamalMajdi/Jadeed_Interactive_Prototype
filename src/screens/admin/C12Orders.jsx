import { APage, ATable, AEmpty, ABadge } from '../../ui/ashell.jsx'
import { useNav } from '../../ui/nav.jsx'
import { SEED_ALL_ORDERS } from '../../data/admin.js'
import { fmt } from '../../data/db.js'

const TONE = {
  'جديد': 'orange', 'قيد التحضير': 'warn', 'خارج للتوصيل': 'purple',
  'تم التسليم': 'gray', 'مرفوض': 'err',
}

/* C-12 — تتبع الطلبات: جميع الطلبات (+ حالة فارغة) */
export default function C12({ state = 'default' }) {
  const { go } = useNav()

  return (
    <APage title="تتبع الطلبات" sub="جميع الطلبات عبر المنصة — مراقبة لحظية لحالات State-Order" actions={<ABadge tone="purple">{SEED_ALL_ORDERS.length} طلبات اليوم</ABadge>}>
      {state === 'empty' ? (
        <AEmpty title="لا طلبات مطابقة" sub="وسّع نطاق الفلترة (التاريخ/الحالة/المتجر) — الطلبات الجارية تظهر لحظيًا هنا" />
      ) : (
        <ATable
          head={['الطلب', 'العميل', 'المتجر', 'الإجمالي', 'الحالة', 'التاريخ', '']}
          rows={SEED_ALL_ORDERS.map((o) => ({
            key: o.id,
            cells: [
              <span className="font-mono text-[11px] font-extrabold text-jadeed-purple" dir="ltr">#{o.id}</span>,
              <span className="font-bold">{o.customer}</span>,
              <span className="text-jadeed-muted">{o.store}</span>,
              <span className="font-bold">{fmt(o.total)}</span>,
              <ABadge tone={TONE[o.status] || 'gray'}>{o.status}</ABadge>,
              <span className="text-[10px] text-jadeed-muted">{o.date}</span>,
              <button onClick={() => go('c13')} className="rounded-xl border border-jadeed-line px-3 py-1.5 text-[10px] font-extrabold text-jadeed-muted transition hover:text-jadeed-purple">
                تتبع
              </button>,
            ],
          }))}
        />
      )}
    </APage>
  )
}
