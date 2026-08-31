import { motion } from 'framer-motion'
import { Crosshair, MapPin, Store } from 'lucide-react'
import { GradHeader, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'

/* B-14 — تحديد الموقع التجاري على الخريطة */
export default function B14() {
  const { go } = useNav()
  const { toast } = useMStore()

  return (
    <div className="flex h-full flex-col bg-white">
      <GradHeader title="الموقع التجاري" sub="حدد موقع متجرك بدقة ليصلك العملاء الأقرب" onBack={() => go('b09')} />

      <div className="relative z-20 -mt-4 flex grow flex-col rounded-t-3xl bg-white">
        {/* الخريطة */}
        <div
          className="relative grow overflow-hidden bg-[#EFEDF4]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(80,2,201,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(80,2,201,.06) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        >
          <div className="absolute inset-x-0 top-[40%] h-3 -rotate-6 rounded-full bg-white shadow-soft" />
          <div className="absolute inset-y-0 right-[32%] w-2.5 rotate-3 rounded-full bg-white shadow-soft" />
          <div className="absolute left-6 top-12 h-24 w-24 rounded-3xl bg-jadeed-tint/70" />

          <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2">
            <motion.span
              animate={{ scale: [1, 2], opacity: [0.45, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
              className="absolute -inset-5 rounded-full bg-jadeed-orange/30"
            />
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-jadeed-purple text-white shadow-pop ring-4 ring-white"
            >
              <Store size={22} />
            </motion.div>
          </div>

          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-extrabold text-jadeed-purple shadow-soft">
            <Crosshair size={12} /> دقة التحديد ±١٠م
          </span>
        </div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative z-10 -mt-2 rounded-t-3xl border-t border-jadeed-line bg-white p-5 shadow-card">
          <p className="text-xs font-bold">موقع «بقالة النور»</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-jadeed-muted">
            <MapPin size={14} className="text-jadeed-purple" /> عدن — كريتر، شارع الجامعة، قرب جولة القاعدة
          </p>
          <button
            onClick={() => { toast('تم تحديث موقع المتجر ✓', 'ok'); go('b09') }}
            className="mt-4 w-full rounded-2xl bg-jadeed-orange py-3.5 text-sm font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light active:scale-[.98]"
          >
            تأكيد الموقع التجاري
          </button>
        </motion.div>
      </div>
    </div>
  )
}
