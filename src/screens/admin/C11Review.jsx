import { useState } from 'react'
import { AlertTriangle, EyeOff, Trash2 } from 'lucide-react'
import { APage, ABadge } from '../../ui/ashell.jsx'
import { useNav } from '../../ui/nav.jsx'
import { useAStore } from '../../ui/astore.jsx'

/* C-11 — مراجعة منتج: إخفاء/حذف مع سبب إلزامي + بانر «غير متوفر → منع الإجراء» (V3) */
export default function C11() {
  const { go } = useNav()
  const { toast } = useAStore()
  const [reason, setReason] = useState('')
  const p = { name: 'بيض بلدي — طبق ٣٠', store: 'بقالة النور', price: '٤٬٢٠٠ ريال' }

  return (
    <APage
      title="مراجعة منتج مُبلّغ عنه"
      sub={`${p.name} · ${p.store} · ${p.price}`}
      actions={<button onClick={() => go('c10')} className="rounded-xl border border-jadeed-line bg-white px-3.5 py-2 text-[11px] font-extrabold text-jadeed-muted transition hover:text-jadeed-purple">← عودة للمنتجات</button>}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {/* بانر V3: منع الإجراء */}
          <div className="flex items-start gap-2.5 rounded-2xl border border-jadeed-orange/40 bg-jadeed-orange-tint p-4 text-[12px] leading-5 text-jadeed-orange">
            <AlertTriangle size={18} className="mt-0.5 shrink-0" />
            <span>
              <b>المنتج غير متوفر في مخزون المتجر (OutOfStock) → تُمنع إجراءات الإخفاء/الحذف.</b>
              {' '}المخالفة المسجلة: «منتج غير متوفر معروض للبيع» — تم تحويلها للمتجر كتنبيه تحديث مخزون، وتُغلق الشكوى تلقائيًا عند تصحيح الحالة.
            </span>
          </div>

        <div className="rounded-2xl border border-jadeed-line bg-white p-4">
          <p className="text-xs font-extrabold">سبب الإجراء <span className="text-jadeed-red">*</span> (إلزامي — يُرسل للتاجر عند توفّر الإجراء)</p>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="اكتب سببًا واضحًا… مثال: صورة المنتج لا تطابق الوصف الفعلي"
            className="mt-2 w-full resize-none rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 text-xs outline-none focus:border-jadeed-purple focus:bg-white"
          />
          <p className="mt-1.5 text-[10px] font-bold text-jadeed-ghost">
            الإخفاء/الحذف يُفعّلان فقط للمنتجات «المتوفرة» — هذا المنتج OutOfStock فالإجراءان مقفولان بقاعدة V3
          </p>
        </div>
        </div>

        <div className="rounded-2xl border border-jadeed-line bg-white p-4">
          <p className="text-xs font-extrabold">الإجراءات</p>
          <div className="mt-3 space-y-2.5">
            {/* القاعدة V3: منتج OutOfStock → الإخفاء/الحذف ممنوعان بلا استثناء */}
            <button
              disabled
              title="ممنوع: المنتج غير متوفر (قاعدة V3)"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-jadeed-gray py-3 text-xs font-extrabold text-jadeed-ghost"
            >
              <EyeOff size={15} /> إخفاء المنتج — مقفل (OutOfStock)
            </button>
            <button
              disabled
              title="ممنوع: المنتج غير متوفر (قاعدة V3)"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-jadeed-line py-3 text-xs font-extrabold text-jadeed-ghost"
            >
              <Trash2 size={15} /> حذف نهائي — مقفل (OutOfStock)
            </button>
            <button
              onClick={() => { toast('أُغلق البلاغ — المنتج سليم ولا مخالفة، وحُوّل تنبيه تحديث المخزون للمتجر', 'ok'); go('c10') }}
              className="w-full rounded-2xl bg-jadeed-tint py-3 text-[11px] font-extrabold text-jadeed-purple transition hover:shadow-pop"
            >
              إغلاق البلاغ + تنبيه المخزون للمتجر
            </button>
          </div>
          <div className="mt-3"><ABadge tone="orange">V3 — منطق منع الإجراء مفعّل</ABadge></div>
        </div>
      </div>
    </APage>
  )
}
