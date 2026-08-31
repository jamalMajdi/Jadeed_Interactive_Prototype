import { useState } from 'react'
import { CheckCircle2, Image, MapPin, XCircle } from 'lucide-react'
import { APage, ABadge } from '../../ui/ashell.jsx'
import { useNav } from '../../ui/nav.jsx'
import { useAStore } from '../../ui/astore.jsx'

const REASONS = ['بيانات المتجر غير مكتملة', 'الشعار/الصور غير مطابقة للمعايير', 'تعارض مع سياسة الفئات المعتمدة']

/* C-06 — تفاصيل طلب متجر + قبول/رفض (الرفض بسبب موثق — حارس آلة الحالة State-Store_Creation_Request) */
export default function C06() {
  const { go } = useNav()
  const { storeReq, approveStore, rejectStore } = useAStore()
  const r = storeReq[0] || { id: 'STR-000', store: '—', owner: '—', cat: '—', date: '—' }
  const [rej, setRej] = useState(false)
  const [reason, setReason] = useState(REASONS[0])

  return (
    <APage title={`طلب متجر ${r.id}`} sub={`${r.store} · ${r.owner} — وصل ${r.date}`} actions={<button onClick={() => go('c05')} className="rounded-xl border border-jadeed-line bg-white px-3.5 py-2 text-[11px] font-extrabold text-jadeed-muted transition hover:text-jadeed-purple">← عودة للقائمة</button>}>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <div className="rounded-2xl border border-jadeed-line bg-white p-4">
            <p className="text-xs font-extrabold">بطاقة المتجر المطلوب</p>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-jadeed-tint text-jadeed-purple">
                <Image size={34} strokeWidth={1.5} />
              </div>
              <div className="grid grow grid-cols-2 gap-x-6 gap-y-2 text-[11px]">
                {[
                  ['اسم المتجر', r.store], ['المالك', r.owner], ['التصنيف', r.cat], ['الشعار', 'مرفوع ✓ (إجباري B-08)'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[9px] font-bold text-jadeed-ghost">{k}</p>
                    <p className="font-extrabold">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-jadeed-line bg-white p-4 text-[11px] leading-5 text-jadeed-muted">
            <MapPin size={16} className="mt-0.5 shrink-0 text-jadeed-purple" />
            الموقع التجاري محدد على الخريطة (B-14): عدن — خور مكسر، شارع الميناء · دقة ±١٠م
          </div>
        </div>

        <div className="rounded-2xl border border-jadeed-line bg-white p-4">
          <p className="text-xs font-extrabold">القرار</p>
          {!rej ? (
            <div className="mt-3 space-y-2.5">
              <button
                onClick={() => { approveStore(r.id, r.store); go('c05') }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-jadeed-purple py-3 text-xs font-extrabold text-white shadow-pop transition hover:bg-jadeed-purple-light"
              >
                <CheckCircle2 size={16} /> قبول ونشر المتجر
              </button>
              <button
                onClick={() => setRej(true)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-jadeed-red/30 py-3 text-xs font-extrabold text-jadeed-red transition hover:bg-jadeed-red-tint"
              >
                <XCircle size={16} /> رفض الطلب
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
                  <span className={`h-2 w-2 rounded-full ${reason === x ? 'bg-jadeed-red' : 'bg-jadeed-line'}`} />
                  {x}
                </button>
              ))}
              <div className="flex gap-2 pt-1.5">
                <button onClick={() => setRej(false)} className="w-1/3 rounded-2xl border border-jadeed-line py-2.5 text-[11px] font-extrabold text-jadeed-muted transition hover:bg-jadeed-bg">
                  تراجع
                </button>
                <button
                  onClick={() => { rejectStore(r.id, r.store, reason); go('c05') }}
                  className="w-2/3 rounded-2xl bg-jadeed-red py-2.5 text-[11px] font-extrabold text-white transition hover:opacity-90"
                >
                  تأكيد الرفض وإشعار التاجر
                </button>
              </div>
            </div>
          )}
          <div className="mt-3 rounded-xl bg-jadeed-bg p-3 text-[10px] leading-4 text-jadeed-muted">
            بعد القبول يظهر المتجر في «المتاجر القريبة» للعملاء (A-06) مرتبًا حسب المسافة (Sort By Distance)
          </div>
        </div>
      </div>
    </APage>
  )
}
