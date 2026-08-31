import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Check, ImagePlus, ShieldAlert, Store } from 'lucide-react'
import { GradHeader, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'

const CATS = ['خضار وفواكه', 'بقالة عامة', 'مخبوزات', 'وجبات']

/* B-08 — طلب إنشاء متجر: الشعار إجباري (V3) · B-08g الحارس */
export default function B08({ state = 'default' }) {
  const { go } = useNav()
  const [logo, setLogo] = useState(false)
  const ready = logo

  if (state === 'guard') {
    return (
      <div className="flex h-full flex-col bg-white">
        <GradHeader title="طلب إنشاء متجر" onBack={() => go('b07')} />
        <div className="flex grow flex-col items-center justify-center px-8 text-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 240, damping: 16 }}
            className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-jadeed-yellow-tint text-jadeed-yellow-dark"
          >
            <ShieldAlert size={38} strokeWidth={1.6} />
          </motion.div>
          <h3 className="text-base font-extrabold">متجرك منشأ بالفعل</h3>
          <p className="mt-1.5 text-xs leading-6 text-jadeed-muted">
            حارس B-08g: لا يمكن فتح طلب إنشاء متجر جديد لحساب يملك متجرًا مفعّلًا — إدارة المتجر تتم من صفحة «متجري»
          </p>
          <button
            onClick={() => go('b09')}
            className="mt-5 flex items-center gap-2 rounded-2xl bg-jadeed-purple px-6 py-3 text-xs font-extrabold text-white shadow-pop transition hover:bg-jadeed-purple-light"
          >
            <Store size={15} /> الذهاب إلى متجري
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <GradHeader title="طلب إنشاء متجر" sub="خطوة أخيرة قبل انطلاق متجرك على «جديد»" onBack={() => go('b07')} />

      <div className="no-scrollbar relative z-20 -mt-4 grow overflow-y-auto rounded-t-3xl bg-white px-5 pb-6 pt-5">
        {/* الشعار — إجباري */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-5 flex flex-col items-center">
          <button
            onClick={() => setLogo(true)}
            className={`relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed transition ${logo ? 'border-jadeed-purple bg-jadeed-tint' : 'border-jadeed-line bg-jadeed-bg hover:border-jadeed-purple/50'}`}
          >
            {logo ? (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                <Store size={40} className="text-jadeed-purple" />
              </motion.span>
            ) : (
              <span className="flex flex-col items-center gap-1 text-jadeed-ghost">
                <Camera size={24} />
                <span className="text-[10px] font-bold">الشعار</span>
              </span>
            )}
            {logo && (
              <span className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-jadeed-purple text-white">
                <Check size={12} strokeWidth={3} />
              </span>
            )}
          </button>
          <p className={`mt-2 text-[11px] font-extrabold ${logo ? 'text-jadeed-purple' : 'text-jadeed-muted'}`}>
            شعار المتجر <span className="text-jadeed-red">*</span> {logo ? '— تم الرفع ✓' : '(إجباري — V3)'}
          </p>
        </motion.div>

        <div className="space-y-3.5">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
            <span className="mb-1 block text-[11px] font-bold">اسم المتجر *</span>
            <input defaultValue="بقالة النور" className="w-full rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 text-xs outline-none focus:border-jadeed-purple focus:bg-white" />
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}>
            <span className="mb-1 block text-[11px] font-bold">وصف مختصر *</span>
            <textarea rows={2} defaultValue="خضار وفواكه طازجة يوميًا من سوق كريتر" className="w-full resize-none rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 text-xs outline-none focus:border-jadeed-purple focus:bg-white" />
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
            <span className="mb-1 block text-[11px] font-bold">التصنيف الرئيسي *</span>
            <div className="flex flex-wrap gap-2">
              {CATS.map((c, i) => (
                <span key={c} className={`rounded-full px-3.5 py-1.5 text-[11px] font-extrabold ${i === 0 ? 'bg-jadeed-purple text-white' : 'border border-jadeed-line bg-jadeed-bg text-jadeed-muted'}`}>
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.button
          variants={fadeUp} initial="hidden" animate="show" custom={4}
          disabled={!ready}
          onClick={() => go('b07')}
          className={`mt-6 w-full rounded-2xl py-3.5 text-sm font-extrabold transition active:scale-[.98] ${ready ? 'bg-jadeed-orange text-white shadow-pop hover:bg-jadeed-orange-light' : 'bg-jadeed-gray text-jadeed-ghost'}`}
        >
          {ready ? 'إرسال طلب إنشاء المتجر' : 'ارفع الشعار لتفعيل الزر (إجباري)'}
        </motion.button>

        <p className="mt-3 flex items-center justify-center gap-1 text-center text-[10px] text-jadeed-ghost">
          <ImagePlus size={11} /> بعد الإرسال يصل طلبك لإدارة «جديد» للمراجعة
        </p>
      </div>
    </div>
  )
}
