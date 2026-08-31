import { motion } from 'framer-motion'
import { Check, Clock, FileCheck2, RefreshCw } from 'lucide-react'
import { StatusBar, Logo, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'

/* B-05 — «حسابك قيد المراجعة» (M2) */
export default function B05() {
  const { go } = useNav()

  const steps = [
    { label: 'استلمنا طلبك ومستنداتك', done: true },
    { label: 'مراجعة الإدارة للمستندات', done: false, now: true },
    { label: 'تفعيل حساب التاجر', done: false },
  ]

  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex grow flex-col items-center justify-center px-8 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 16 }}
          className="relative mb-5"
        >
          <motion.span
            animate={{ scale: [1, 1.7], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
            className="absolute -inset-3 rounded-full bg-jadeed-purple/25"
          />
          <span className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-jadeed-tint text-jadeed-purple">
            <FileCheck2 size={40} strokeWidth={1.6} />
          </span>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <Logo size={22} />
          <h1 className="mt-2 text-lg font-extrabold">حسابك قيد المراجعة</h1>
          <p className="mt-1.5 text-xs leading-6 text-jadeed-muted">
            وصلنا طلب «بقالة النور» كاملًا ✓ — تستغرق المراجعة عادةً ٢٤–٤٨ ساعة، وسنخطرك بالنتيجة عبر إشعار (M2)
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="mt-6 w-full space-y-3.5 rounded-3xl border border-jadeed-line bg-jadeed-bg p-4 text-start">
          {steps.map((s, i) => (
            <div key={s.label} className="relative flex items-center gap-3">
              {i < steps.length - 1 && (
                <span className={`absolute right-[11px] top-6 h-[calc(100%+8px)] w-0.5 ${s.done ? 'bg-jadeed-purple/40' : 'bg-jadeed-line'}`} />
              )}
              <span className={`z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${s.done ? 'bg-jadeed-purple text-white' : s.now ? 'bg-jadeed-orange text-white' : 'border-2 border-jadeed-line bg-white'}`}>
                {s.done ? <Check size={12} strokeWidth={3} /> : s.now ? <Clock size={11} /> : null}
              </span>
              <p className={`text-xs ${s.now ? 'font-extrabold' : s.done ? 'font-bold text-jadeed-black' : 'font-bold text-jadeed-ghost'}`}>{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-6 w-full space-y-2.5">
          <button
            onClick={() => go('b07')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-jadeed-orange py-3.5 text-sm font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light"
          >
            <RefreshCw size={15} /> تحديث حالة الطلب
          </button>
          <p className="text-center text-[10px] text-jadeed-ghost">في حال الرفض ستظهر لك أسبابه وخيار إعادة التقديم (B-06)</p>
        </motion.div>
      </div>
    </div>
  )
}
