import { Clock, FileWarning } from 'lucide-react'
import { APage, ASkel, ATable, ABadge, AEmpty } from '../../ui/ashell.jsx'
import { useNav } from '../../ui/nav.jsx'
import { useAStore } from '../../ui/astore.jsx'

/* C-03 — قائمة طلبات توثيق التجار (+ الحالات: فارغة · تحميل C-17 · شارة مستندات ناقصة V3) */
export default function C03({ state = 'default' }) {
  const { go } = useNav()
  const { verify } = useAStore()

  return (
    <APage
      title="طلبات توثيق التجار"
      sub="مراجعة المستندات واتخاذ القرار — كل قرار يُسجل في سجل النشاط"
      actions={<ABadge tone="orange">{verify.length} طلبات معلّقة</ABadge>}
    >
      {state === 'loading' && <ASkel rows={5} cols={5} />}

      {state === 'empty' && (
        <AEmpty
          title="لا طلبات توثيق معلّقة"
          sub="أحسنت! رُوجعت كل الطلبات الواردة — ستظهر هنا أي طلبات جديدة فور وصولها من تطبيق التاجر (B-05)"
        />
      )}

      {state === 'default' && (
        <>
          {verify.length === 0 ? (
            <AEmpty title="أنجزت كل الطلبات ✓" sub="لا توجد طلبات معلّقة — أعد تحديث القائمة لاحقًا" />
          ) : (
            <ATable
              head={['الطلب', 'المتجر', 'المدينة', 'المستندات', 'الحالة', '']}
              rows={verify.map((r) => {
                const missing = !r.docs.front || !r.docs.back || !r.docs.storefront
                return {
                  key: r.id,
                  cells: [
                    <span className="font-mono text-[11px] font-bold text-jadeed-purple" dir="ltr">{r.id}</span>,
                    <span>
                      <span className="block font-extrabold">{r.store}</span>
                      <span className="block text-[10px] text-jadeed-muted">{r.owner} · {r.date}</span>
                    </span>,
                    <span className="text-jadeed-muted">{r.city}</span>,
                    missing ? <ABadge tone="err"><FileWarning size={11} /> مستندات ناقصة</ABadge> : <ABadge tone="ok">مكتملة ٣/٣</ABadge>,
                    r.status === 'docs' ? <ABadge tone="err">ناقصة — يحتاج استكمال</ABadge> : <ABadge tone="warn"><Clock size={11} /> قيد المراجعة</ABadge>,
                    <button onClick={() => go('c04')} className="rounded-xl bg-jadeed-purple px-3.5 py-2 text-[10px] font-extrabold text-white transition hover:bg-jadeed-purple-light">
                      مراجعة واتخاذ قرار
                    </button>,
                  ],
                }
              })}
            />
          )}

          <p className="mt-3 rounded-xl bg-jadeed-orange-tint px-3.5 py-2.5 text-[11px] leading-5 text-jadeed-orange">
            V3: الطلبات ذات «مستندات ناقصة» تظهر بشارة حمراء داخل الصف نفسه — لا يمكن الموافقة قبل استكمال الملف (راجع C-04)
          </p>
        </>
      )}
    </APage>
  )
}
