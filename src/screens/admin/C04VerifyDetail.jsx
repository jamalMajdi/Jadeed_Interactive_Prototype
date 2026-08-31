import { CheckCircle2, FileWarning, IdCard, Store, XCircle } from 'lucide-react'
import { APage, ABadge } from '../../ui/ashell.jsx'
import { useNav } from '../../ui/nav.jsx'
import { useAStore } from '../../ui/astore.jsx'

/* C-04 — تفاصيل طلب توثيق + قرار الموافقة/الرفض */
export default function C04() {
  const { go } = useNav()
  const { verify, approveVerify, rejectVerify, toast } = useAStore()
  const r = verify[0] || { id: 'REQ-0000', store: '—', owner: '—', city: '—', date: '—', docs: {}, status: 'review' }
  const missing = !r.docs.front || !r.docs.back || !r.docs.storefront

  const DOCS = [
    { k: 'front', label: 'الهوية — الوجه الأمامي' },
    { k: 'back', label: 'الهوية — الوجه الخلفي' },
    { k: 'store', label: 'صورة واجهة المتجر' },
  ]

  return (
    <APage title={`طلب توثيق ${r.id}`} sub={`${r.store} · ${r.owner} · ${r.city} — وصل ${r.date}`} actions={<button onClick={() => go('c03')} className="rounded-xl border border-jadeed-line bg-white px-3.5 py-2 text-[11px] font-extrabold text-jadeed-muted transition hover:text-jadeed-purple">← عودة للقائمة</button>}>
      <div className="grid gap-4 lg:grid-cols-3">
        {/* المستندات */}
        <div className="lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-3">
            {DOCS.map((d) => {
              const ok = r.docs[d.k]
              return (
                <div key={d.k} className={`rounded-2xl border-2 p-4 text-center ${ok ? 'border-jadeed-line bg-white' : 'border-dashed border-jadeed-red/40 bg-jadeed-red-tint/40'}`}>
                  <div className={`mx-auto flex h-20 w-full items-center justify-center rounded-xl ${ok ? 'bg-jadeed-tint text-jadeed-purple' : 'bg-white text-jadeed-red'}`}>
                    {d.k === 'store' ? <Store size={30} strokeWidth={1.5} /> : <IdCard size={30} strokeWidth={1.5} />}
                  </div>
                  <p className="mt-2 text-[10px] font-extrabold">{d.label}</p>
                  <p className={`mt-0.5 text-[9px] font-bold ${ok ? 'text-jadeed-purple' : 'text-jadeed-red'}`}>{ok ? 'مرفوعة ✓ واضحة' : 'غير مرفوعة ✗'}</p>
                </div>
              )
            })}
          </div>

          {missing && (
            <div className="mt-3 flex items-start gap-2 rounded-2xl border border-jadeed-red/25 bg-jadeed-red-tint p-3.5 text-[11px] leading-5 text-jadeed-red">
              <FileWarning size={16} className="mt-0.5 shrink-0" />
              <span>
                <b>مستندات ناقصة (V3):</b> لا يمكن اعتماد الموافقة قبل رفع كل المستندات الثلاثة — أرسل طلب استكمال للتاجر من زر «طلب استكمال».
              </span>
            </div>
          )}

          <div className="mt-3 rounded-2xl border border-jadeed-line bg-white p-4">
            <p className="text-xs font-extrabold">بيانات الطلب</p>
            <div className="mt-2.5 grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] sm:grid-cols-3">
              {[
                ['اسم المتجر', r.store], ['المالك', r.owner], ['المدينة', r.city],
                ['رقم الطلب', r.id], ['تاريخ التقديم', r.date], ['المصدر', 'تطبيق التاجر B-02/B-04'],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[9px] font-bold text-jadeed-ghost">{k}</p>
                  <p className="font-extrabold">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* القرار */}
        <div className="rounded-2xl border border-jadeed-line bg-white p-4">
          <p className="text-xs font-extrabold">قرار المراجعة</p>
          <div className="mt-3 space-y-2.5">
            <button
              disabled={missing}
              onClick={() => { approveVerify(r.id, r.store); go('c03') }}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-xs font-extrabold transition ${missing ? 'bg-jadeed-gray text-jadeed-ghost' : 'bg-jadeed-purple text-white shadow-pop hover:bg-jadeed-purple-light'}`}
            >
              <CheckCircle2 size={16} /> موافقة وتوثيق التاجر
            </button>
            <button
              onClick={() => { rejectVerify(r.id, r.store); go('c03') }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-jadeed-red/30 py-3 text-xs font-extrabold text-jadeed-red transition hover:bg-jadeed-red-tint"
            >
              <XCircle size={16} /> رفض الطلب
            </button>
            <button
              onClick={() => { toast('أُرسل طلب استكمال المستندات للتاجر — سيُبلّغ برفع الناقص', 'info'); go('c03') }}
              className="w-full rounded-2xl border border-jadeed-line py-2.5 text-[11px] font-extrabold text-jadeed-muted transition hover:bg-jadeed-bg"
            >
              طلب استكمال المستندات
            </button>
          </div>
          <p className="mt-3 text-[10px] leading-4 text-jadeed-muted">
            عند القرار: يُرسل إشعار تلقائي للتاجر (sendNotification) ويُحدّث حالة حسابه في قائمة المستخدمين (C-07).
          </p>
        </div>
      </div>
    </APage>
  )
}
