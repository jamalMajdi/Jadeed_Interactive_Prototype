import { motion } from 'framer-motion'
import { LogIn, Package, Store, TrendingUp, UserPlus } from 'lucide-react'
import { StatusBar, Logo, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'

export default function B01() {
  const { go } = useNav()

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-jadeed-purple via-[#5f0de0] to-jadeed-purple-light text-white">
      <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -right-20 top-48 h-64 w-64 rounded-full bg-jadeed-orange/25 blur-3xl" />

      <StatusBar light />

      <div className="flex grow flex-col items-center justify-center gap-5 px-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.08 }}
        >
          <div className="rounded-3xl bg-white p-4 shadow-pop">
            <Logo size={60} />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <p className="text-[11px] font-bold tracking-wide text-jadeed-yellow" dir="ltr">JADEED FOR BUSINESS</p>
          <h1 className="mt-1 text-2xl font-extrabold leading-8">وسّع مشروعك مع «جديد»</h1>
          <p className="mt-1.5 text-xs leading-6 text-white/75">افتح متجرك أمام آلاف العملاء في مديريتهم — أدر كل شيء من هاتفك</p>
        </motion.div>

        <motion.ul variants={fadeUp} initial="hidden" animate="show" custom={1} className="mt-2 w-full space-y-2 text-start">
          {[
            { Icon: Package, t: 'أضف منتجاتك وحدّد أسعارك ومخزونك' },
            { Icon: Store, t: 'استقبل طلبات حيّك وجهّزها بضغطة' },
            { Icon: TrendingUp, t: 'تابع مبيعاتك وتقييماتك لحظة بلحظة' },
          ].map(({ Icon, t }) => (
            <li key={t} className="flex items-center gap-2.5 rounded-2xl bg-white/10 px-3.5 py-2.5 text-[11px] font-bold backdrop-blur">
              <Icon size={16} className="shrink-0 text-jadeed-yellow" /> {t}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-4 w-full space-y-3">
          <button
            onClick={() => go('b02')}
            className="w-full rounded-2xl bg-jadeed-orange py-3.5 text-sm font-extrabold shadow-pop transition hover:bg-jadeed-orange-light active:scale-[.98]"
          >
            <span className="inline-flex items-center gap-2"><UserPlus size={18} /> سجّل كتاجر</span>
          </button>
          <button
            onClick={() => go('b07')}
            className="w-full rounded-2xl border border-white/40 bg-white/10 py-3.5 text-sm font-extrabold backdrop-blur transition hover:bg-white/20 active:scale-[.98]"
          >
            <span className="inline-flex items-center gap-2"><LogIn size={18} /> دخول تجار</span>
          </button>
        </motion.div>
      </div>

      <p className="pb-7 text-center text-[10px] text-white/55">B-01 · ترحيب التاجر</p>
    </div>
  )
}
