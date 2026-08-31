import { APage, ATable, ABadge, AEmpty } from '../../ui/ashell.jsx'
import { useNav } from '../../ui/nav.jsx'
import { useAStore } from '../../ui/astore.jsx'

/* C-05 — قائمة طلبات إنشاء المتاجر (+ حالة فارغة) */
export default function C05({ state = 'default' }) {
  const { go } = useNav()
  const { storeReq } = useAStore()

  return (
    <APage title="طلبات إنشاء المتاجر" sub="طلبات «B-08 طلب إنشاء متجر» التي وصلت من التجار الموثّقين" actions={<ABadge tone="orange">{storeReq.length} قيد النظر</ABadge>}>
      {state === 'empty' ? (
        <AEmpty title="لا طلبات متاجر معلّقة" sub="رُوجعت كل طلبات إنشاء المتاجر — الطلبات الجديدة من تطبيق التاجر ستظهر هنا تلقائيًا" />
      ) : storeReq.length === 0 ? (
        <AEmpty title="أنجزت كل الطلبات ✓" sub="لا توجد طلبات إنشاء متاجر معلّقة حاليًا" />
      ) : (
        <ATable
          head={['الطلب', 'المتجر', 'التصنيف', 'التاريخ', 'الحالة', '']}
          rows={storeReq.map((r) => ({
            key: r.id,
            cells: [
              <span className="font-mono text-[11px] font-bold text-jadeed-purple" dir="ltr">{r.id}</span>,
              <span>
                <span className="block font-extrabold">{r.store}</span>
                <span className="block text-[10px] text-jadeed-muted">{r.owner}</span>
              </span>,
              <span className="text-jadeed-muted">{r.cat}</span>,
              <span className="text-jadeed-muted">{r.date}</span>,
              <ABadge tone="warn">قيد النظر</ABadge>,
              <button onClick={() => go('c06')} className="rounded-xl bg-jadeed-purple px-3.5 py-2 text-[10px] font-extrabold text-white transition hover:bg-jadeed-purple-light">
                فحص الطلب
              </button>,
            ],
          }))}
        />
      )}
    </APage>
  )
}
