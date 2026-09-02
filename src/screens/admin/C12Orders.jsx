import { useState } from 'react'
import { APage, ATable, AEmpty, ABadge } from '../../ui/ashell.jsx'
import { useNav } from '../../ui/nav.jsx'
import { SEED_ALL_ORDERS } from '../../data/admin.js'
import { fmt } from '../../data/db.js'

const TONE = {
  'جديد': 'orange', 'قيد التحضير': 'warn', 'خارج للتوصيل': 'purple',
  'تم التسليم': 'gray', 'مرفوض': 'err',
}

/* شرائح تصفية الحالة — اختصار عمود «الحالة» في الجدول (التسلسل البصري للمهام الإدارية) */
const FILTERS = ['الكل', 'جديد', 'قيد التحضير', 'خارج للتوصيل', 'تم التسليم', 'مرفوض']

/* C-12 — تتبع الطلبات: جميع الطلبات (+ حالة فارغة C-12e + فراغ حي عند عدم مطابقة الفلتر) */
export default function C12({ state = 'default' }) {
  const { go } = useNav()
  const [f, setF] = useState('الكل')
  const list = f === 'الكل' ? SEED_ALL_ORDERS : SEED_ALL_ORDERS.filter((o) => o.status === f)

  return (
    <APage title="تتبع الطلبات" sub="جميع الطلبات عبر المنصة — مراقبة لحظية لحالات State-Order" actions={<ABadge tone="purple">{SEED_ALL_ORDERS.length} طلبات اليوم</ABadge>}>
      {/* التصفية */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {FILTERS.map((x) => (
          <button
            key={x}
            onClick={() => setF(x)}
            className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold transition ${f === x ? 'bg-jadeed-purple text-white shadow-soft' : 'border border-jadeed-line bg-white text-jadeed-muted hover:text-jadeed-purple'}`}
          >
            {x}
            {x !== 'الكل' && (
              <span className={`ms-1 ${f === x ? 'text-white/70' : 'text-jadeed-ghost'}`}>({SEED_ALL_ORDERS.filter((o) => o.status === x).length})</span>
            )}
          </button>
        ))}
      </div>

      {state === 'empty' ? (
        <AEmpty title="لا طلبات مطابقة" sub="وسّع نطاق الفلترة (التاريخ/الحالة/المتجر) — الطلبات الجارية تظهر لحظيًا هنا" />
      ) : list.length === 0 ? (
        <AEmpty
          title={`لا طلبات بحالة «${f}»`}
          sub="جرّب حالة أخرى أو اختر «الكل» — الطلبات تصل لحظيًا من تطبيقات العميل والتاجر"
        />
      ) : (
        <ATable
          head={['الطلب', 'العميل', 'المتجر', 'الإجمالي', 'الحالة', 'التاريخ', '']}
          rows={list.map((o) => ({
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
