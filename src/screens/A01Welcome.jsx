import { motion } from 'framer-motion'
import { UserPlus, LogIn, ShieldCheck } from 'lucide-react'
import { StatusBar, Logo, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'

export default function A01() {
  const { go } = useNav()

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-jadeed-purple via-[#5f0de0] to-jadeed-purple-light text-white">
      <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -right-20 top-44 h-64 w-64 rounded-full bg-jadeed-orange/25 blur-3xl" />

      <StatusBar light />

      <div className="flex grow flex-col items-center justify-center gap-5 px-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.08 }}
        >
          <div className="rounded-3xl bg-white p-4 shadow-pop">
            <Logo size={64} />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
          <h1 className="text-3xl font-extrabold">جديد</h1>
          <p className="mt-1 text-sm font-medium text-white/80">كل ما تحتاجه من متاجر حيّك — يصلك إلى باب البيت</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-8 w-full space-y-3">
          <button
            onClick={() => go('a02')}
            className="w-full rounded-2xl bg-jadeed-orange py-3.5 text-sm font-extrabold shadow-pop transition hover:bg-jadeed-orange-light active:scale-[.98]"
          >
            <span className="inline-flex items-center gap-2"><UserPlus size={18} /> إنشاء حساب جديد</span>
          </button>
          <button
            onClick={() => go('a02')}
            className="w-full rounded-2xl border border-white/40 bg-white/10 py-3.5 text-sm font-extrabold backdrop-blur transition hover:bg-white/20 active:scale-[.98]"
          >
            <span className="inline-flex items-center gap-2"><LogIn size={18} /> تسجيل الدخول</span>
          </button>
        </motion.div>
      </div>

      <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex items-center justify-center gap-1.5 pb-8 text-[11px] text-white/60">
        <ShieldCheck size={13} /> بالمتابعة أنت توافق على الشروط وسياسة الخصوصية
      </motion.p>
    </div>
  )
}
