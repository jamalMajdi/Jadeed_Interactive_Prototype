import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, ChevronLeft, Clock, MapPin, Phone, XCircle } from 'lucide-react'
import { GradHeader, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'

/* B-09 — إدارة المتجر: تعديل معلومات المتجر (وخطأ التحقق B-09e) */
export default function B09({ state = 'default' }) {
  const { go } = useNav()
  const { storeOpen, toggleStore, toast } = useMStore()
  const err = state === 'error'

  return (
    <div className="flex h-full flex-col bg-white">
      <GradHeader title="متجري" sub="تعديل معلومات المتجر الظاهرة للعملاء" onBack={() => go('b07')}>
        <button
          onClick={() => go('b14')}
          className="ms-auto flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-bold transition hover:bg-white/25"
        >
          <MapPin size={12} /> الموقع
        </button>
      </GradHeader>

      <div className="no-scrollbar relative z-20 -mt-4 grow overflow-y-auto rounded-t-3xl bg-white px-5 pb-6 pt-5">
        {err && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-start gap-2 rounded-2xl border border-jadeed-red/25 bg-jadeed-red-tint p-3 text-[11px] leading-5 text-jadeed-red"
          >
            <XCircle size={15} className="mt-0.5 shrink-0" />
            تعذّر الحفظ: تحقق من الحقول المظللة بالأحمر — صيغة رقم الجوال غير صحيحة (B-09e)
          </motion.div>
        )}

        <div className="space-y-3.5">
          <div>
            <span className="mb-1 block text-[11px] font-bold">اسم المتجر *</span>
            <input defaultValue="بقالة النور" className="w-full rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 text-xs outline-none focus:border-jadeed-purple focus:bg-white" />
          </div>
          <div>
            <span className="mb-1 block text-[11px] font-bold">وصف المتجر</span>
            <textarea rows={2} defaultValue="خضار وفواكه طازجة يوميًا من سوق كريتر" className="w-full resize-none rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 text-xs outline-none focus:border-jadeed-purple focus:bg-white" />
          </div>
          <div>
            <span className="mb-1 block text-[11px] font-bold">جوال المتجر *</span>
            <div dir="ltr" className={`flex items-center gap-2 rounded-xl border bg-jadeed-bg px-3.5 py-3 transition focus-within:bg-white ${err ? 'border-jadeed-red/60 bg-jadeed-red-tint/40' : 'border-jadeed-line focus-within:border-jadeed-purple'}`}>
              <Phone size={14} className={err ? 'text-jadeed-red' : 'text-jadeed-ghost'} />
              <input defaultValue={err ? '77xx xx' : '771 456 890'} className="w-full bg-transparent text-left text-xs outline-none" />
            </div>
            {err && <span className="mt-1 block text-[10px] font-bold text-jadeed-red">أدخل رقمًا يمنيًا صحيحًا: 7xx xxx xxx</span>}
          </div>
          <div>
            <span className="mb-1 block text-[11px] font-bold">ساعات العمل *</span>
            <div className="flex items-center gap-2 rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3">
              <Clock size={14} className="text-jadeed-ghost" />
              <input defaultValue="٧:٠٠ ص — ١١:٠٠ م" className="w-full bg-transparent text-xs outline-none" />
            </div>
          </div>

          {/* حالة المتجر */}
          <div className="flex items-center gap-3 rounded-2xl border border-jadeed-line bg-white p-3.5 shadow-soft">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${storeOpen ? 'bg-jadeed-tint text-jadeed-purple' : 'bg-jadeed-gray text-jadeed-muted'}`}>
              <MapPin size={18} />
            </span>
            <span className="grow">
              <span className="block text-xs font-extrabold">حالة استقبال الطلبات</span>
              <span className="block text-[10px] text-jadeed-muted">{storeOpen ? 'متجرك مفتوح ويستقبل الطلبات الآن' : 'مغلق مؤقتًا — لن يظهر في المتاجر القريبة'}</span>
            </span>
            <button
              onClick={() => { toggleStore(); toast(storeOpen ? 'أُغلق المتجر مؤقتًا — لن يظهر للعملاء' : 'فُتح المتجر — يستقبل الطلبات الآن', storeOpen ? 'warn' : 'ok') }}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${storeOpen ? 'bg-jadeed-purple' : 'bg-jadeed-gray'}`}
            >
              <motion.span animate={{ x: storeOpen ? -20 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="block h-5 w-5 rounded-full bg-white shadow-soft" />
            </button>
          </div>

          <button
            onClick={() => go('b14')}
            className="flex w-full items-center gap-2.5 rounded-2xl border border-jadeed-line bg-white p-3.5 text-start shadow-soft transition hover:shadow-pop"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-jadeed-tint text-jadeed-purple"><MapPin size={18} /></span>
            <span className="grow">
              <span className="block text-xs font-extrabold">الموقع التجاري على الخريطة</span>
              <span className="block text-[10px] text-jadeed-muted">عدن — كريتر، شارع الجامعة (B-14)</span>
            </span>
            <ChevronLeft size={16} className="text-jadeed-ghost" />
          </button>
        </div>

        <button
          onClick={() => { if (err) { go('b09'); toast('صُحّح رقم الجوال — حُفظت التعديلات ✓', 'ok') } else toast('حُفظت تعديلات المتجر ✓', 'ok') }}
          className={`mt-6 w-full rounded-2xl py-3.5 text-sm font-extrabold transition active:scale-[.98] ${err ? 'bg-jadeed-gray text-jadeed-ghost' : 'bg-jadeed-orange text-white shadow-pop hover:bg-jadeed-orange-light'}`}
        >
          {err ? 'تعذّر الحفظ — صحّح الأخطاء' : 'حفظ التعديلات'}
        </button>

        <p className="mt-3 flex items-center justify-center gap-1 text-center text-[10px] text-jadeed-ghost">
          <AlertTriangle size={11} /> تغيير الاسم أو التصنيف يتطلب موافقة الإدارة
        </p>
      </div>
    </div>
  )
}
