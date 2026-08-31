import { motion } from 'framer-motion'
import { Check, Bike, Hash, Store as StoreIcon } from 'lucide-react'
import { StatusBar, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'

export default function A12() {
  const { go } = useNav()

  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />

      <div className="flex grow flex-col items-center justify-center px-8 text-center">
        {/* دائرة النجاح */}
        <div className="relative mb-6">
          <motion.span
            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 1.7, ease: 'easeOut' }}
            className="absolute -inset-4 rounded-full bg-jadeed-purple/25"
          />
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.1 }}
            className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-jadeed-purple to-jadeed-purple-light text-white shadow-pop"
          >
            <Check size={52} strokeWidth={3} />
          </motion.div>
        </div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="show" className="text-xl font-extrabold">
          تم إرسال طلبك بنجاح!
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={1} className="mt-1.5 text-xs leading-6 text-jadeed-muted">
          وصل طلبك إلى المتجر وهو الآن بانتظار التجهيز — سنخطرك بكل تحديث
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-7 w-full space-y-3 rounded-3xl border border-jadeed-line bg-jadeed-bg p-4 text-start"
        >
          <p className="flex items-center gap-2 text-xs font-extrabold">
            <Hash size={14} className="text-jadeed-purple" /> طلب رقم <span dir="ltr" className="text-jadeed-purple">#1051</span>
          </p>
          <p className="flex items-center gap-2 text-xs font-bold text-jadeed-muted">
            <StoreIcon size={14} className="text-jadeed-purple" /> بقالة النور · ٣ عناصر
          </p>
          <p className="flex items-center gap-2 text-xs font-bold text-jadeed-muted">
            <Bike size={14} className="text-jadeed-purple" /> الوصول المتوقع خلال ~٢٥ دقيقة
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-7 w-full space-y-2.5">
          <button
            onClick={() => go('a14')}
            className="w-full rounded-2xl bg-jadeed-orange py-3.5 text-sm font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light active:scale-[.98]"
          >
            تتبع الطلب
          </button>
          <button
            onClick={() => go('a06')}
            className="w-full rounded-2xl border border-jadeed-line bg-white py-3.5 text-sm font-extrabold text-jadeed-purple transition hover:bg-jadeed-tint"
          >
            متابعة التسوق
          </button>
        </motion.div>
      </div>
    </div>
  )
}
