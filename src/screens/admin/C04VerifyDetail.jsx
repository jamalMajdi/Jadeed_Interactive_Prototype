import { useState } from 'react'
import { CheckCircle2, FileWarning, IdCard, ShieldAlert, Store, X, XCircle, ZoomIn } from 'lucide-react'
import { APage, ABadge } from '../../ui/ashell.jsx'
import { useNav } from '../../ui/nav.jsx'
import { useAStore } from '../../ui/astore.jsx'

/* أسباب الرفض — إجبارية وفق UC-03 (Squad-1/A1): «يظهر حقل نصي لكتابة سبب الرفض (إجباري)»
   وACT_VerifyMerchants: Enter Rejection Reason → Send Rejection Notification with Rejection Reason */
const REASONS = [
  'صور المستندات غير واضحة',
  'البيانات لا تطابق المستندات المرفقة',
  'المستندات غير مكتملة — رفض مباشر (A2)',
]

/* C-04 — تفاصيل طلب توثيق + قرار الموافقة/الرفض
   الموافقة بنقرة واحدة (قصة A2) · الرفض بحوار سبب إلزامي + مسار احتيال A3
   + تكبير المستندات (UC-03 خطوة ٥: «مع إمكانية تكبير صورة البطاقة وصورة المتجر») */
export default function C04() {
  const { go } = useNav()
  const { verify, approveVerify, rejectVerify, toast } = useAStore()
  const r = verify[0] || { id: 'REQ-0000', store: '—', owner: '—', city: '—', date: '—', docs: {}, status: 'review' }
  const missing = !r.docs.front || !r.docs.back || !r.docs.storefront

  const [rej, setRej] = useState(false)
  const [reason, setReason] = useState(REASONS[0])
  const [fraud, setFraud] = useState(false)
  const [zoom, setZoom] = useState(null)

  const DOCS = [
    { k: 'front', label: 'الهوية — الوجه الأمامي' },
    { k: 'back', label: 'الهوية — الوجه الخلفي' },
    { k: 'store', label: 'صورة واجهة المتجر' },
  ]

  return (
    <div className="relative">
      <APage title={`طلب توثيق ${r.id}`} sub={`${r.store} · ${r.owner} · ${r.city} — وصل ${r.date}`} actions={<button onClick={() => go('c03')} className="rounded-xl border border-jadeed-line bg-white px-3.5 py-2 text-[11px] font-extrabold text-jadeed-muted transition hover:text-jadeed-purple">← عودة للقائمة</button>}>
        <div className="grid gap-4 lg:grid-cols-3">
          {/* المستندات */}
          <div className="lg:col-span-2">
            <div className="grid gap-3 sm:grid-cols-3">
              {DOCS.map((d) => {
                const ok = r.docs[d.k]
                return (
                  <button
                    key={d.k}
                    onClick={() => ok && setZoom(d)}
                    title={ok ? 'اضغط لتكبير المستند (UC-03)' : 'المستند غير مرفوع'}
                    className={`relative rounded-2xl border-2 p-4 text-center transition ${ok ? 'border-jadeed-line bg-white hover:border-jadeed-purple/50 hover:shadow-pop' : 'border-dashed border-jadeed-red/40 bg-jadeed-red-tint/40'}`}
                  >
                    {ok && (
                      <span className="absolute left-2 top-2 flex items-center gap-1 rounded-lg bg-jadeed-tint px-1.5 py-1 text-[9px] font-extrabold text-jadeed-purple">
                        <ZoomIn size={11} /> تكبير
                      </span>
                    )}
                    <div className={`mx-auto flex h-20 w-full items-center justify-center rounded-xl ${ok ? 'bg-jadeed-tint text-jadeed-purple' : 'bg-white text-jadeed-red'}`}>
                      {d.k === 'store' ? <Store size={30} strokeWidth={1.5} /> : <IdCard size={30} strokeWidth={1.5} />}
                    </div>
                    <p className="mt-2 text-[10px] font-extrabold">{d.label}</p>
                    <p className={`mt-0.5 text-[9px] font-bold ${ok ? 'text-jadeed-purple' : 'text-jadeed-red'}`}>{ok ? 'مرفوعة ✓ واضحة' : 'غير مرفوعة ✗'}</p>
                  </button>
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

            {!rej ? (
              <div className="mt-3 space-y-2.5">
                <button
                  disabled={missing}
                  onClick={() => { approveVerify(r.id, r.store); go('c03') }}
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-xs font-extrabold transition ${missing ? 'bg-jadeed-gray text-jadeed-ghost' : 'bg-jadeed-purple text-white shadow-pop hover:bg-jadeed-purple-light'}`}
                >
                  <CheckCircle2 size={16} /> موافقة وتوثيق التاجر
                </button>
                <button
                  onClick={() => setRej(true)}
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
            ) : (
              <div className="mt-3 space-y-2">
                <p className="text-[11px] font-extrabold">سبب الرفض <span className="text-jadeed-red">*</span> (إلزامي — يُرسل للتاجر لإعادة التقديم)</p>
                {REASONS.map((x) => (
                  <button
                    key={x}
                    onClick={() => setReason(x)}
                    className={`flex w-full items-center gap-2 rounded-xl border-2 p-2.5 text-start text-[11px] font-bold transition ${reason === x ? 'border-jadeed-red/50 bg-jadeed-red-tint text-jadeed-red' : 'border-jadeed-line hover:bg-jadeed-bg'}`}
                  >
                    <span className={`h-2 w-2 shrink-0 rounded-full ${reason === x ? 'bg-jadeed-red' : 'bg-jadeed-line'}`} />
                    {x}
                  </button>
                ))}

                {/* مسار الاحتيال — A3 + عقدة Fraud Suspected? في ACT_VerifyMerchants */}
                <button
                  onClick={() => setFraud((v) => !v)}
                  className={`flex w-full items-start gap-2 rounded-xl border-2 p-2.5 text-start transition ${fraud ? 'border-jadeed-red bg-jadeed-red-tint' : 'border-jadeed-line hover:bg-jadeed-bg'}`}
                >
                  <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 ${fraud ? 'border-jadeed-red bg-jadeed-red text-white' : 'border-jadeed-line'}`}>
                    {fraud && <X size={11} strokeWidth={3.5} />}
                  </span>
                  <span className="text-[10px] font-bold leading-4 text-jadeed-red">
                    اشتباه احتيال (صورة مفبركة / بطاقة مزورة) — A3: رفض + <b>حظر رقم الجوال نهائيًا</b>
                  </span>
                </button>

                <div className="flex gap-2 pt-1.5">
                  <button onClick={() => setRej(false)} className="w-1/3 rounded-2xl border border-jadeed-line py-2.5 text-[11px] font-extrabold text-jadeed-muted transition hover:bg-jadeed-bg">
                    تراجع
                  </button>
                  <button
                    onClick={() => { rejectVerify(r.id, r.store, reason, fraud); go('c03') }}
                    className="w-2/3 rounded-2xl bg-jadeed-red py-2.5 text-[11px] font-extrabold text-white transition hover:opacity-90"
                  >
                    {fraud ? 'تأكيد الرفض + حظر الجوال' : 'تأكيد الرفض وإشعار التاجر'}
                  </button>
                </div>
              </div>
            )}

            <p className="mt-3 text-[10px] leading-4 text-jadeed-muted">
              عند القرار: يُرسل إشعار تلقائي للتاجر (sendNotification)، ويُسجّل القرار باسم المشرف وتاريخه في سجل النشاط (C-15)، وتُحدّث حالة حسابه في C-07.
            </p>
            {fraud && <div className="mt-2"><ABadge tone="err">مسار A3 فعّال — Suspected Fraud</ABadge></div>}
          </div>
        </div>
      </APage>

      {/* تكبير المستند — UC-03: «مع إمكانية تكبير صورة البطاقة وصورة المتجر» */}
      {zoom && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-jadeed-black/60 p-6 backdrop-blur-sm" onClick={() => setZoom(null)}>
          <div className="w-full max-w-lg rounded-3xl bg-white p-5 text-center shadow-phone" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto flex h-64 items-center justify-center rounded-2xl bg-jadeed-tint">
              {zoom.k === 'store' ? <Store size={96} strokeWidth={1} className="text-jadeed-purple" /> : <IdCard size={96} strokeWidth={1} className="text-jadeed-purple" />}
            </div>
            <p className="mt-3 text-sm font-extrabold">{zoom.label}</p>
            <p className="mt-1 text-[11px] leading-5 text-jadeed-muted">
              عرض مكبّر للمستند — تحقق من وضوح الصورة ومطابقتها للبيانات، وأنها حقيقية وليست من الإنترنت (UC-03)
            </p>
            <button onClick={() => setZoom(null)} className="mt-4 rounded-xl border border-jadeed-line px-4 py-2 text-[11px] font-extrabold text-jadeed-muted transition hover:text-jadeed-purple">
              إغلاق التكبير
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
