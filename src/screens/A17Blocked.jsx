import { motion } from 'framer-motion'
import { ShieldAlert, MessageCircle, LogOut } from 'lucide-react'
import { StatusBar, Logo, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'
import { useAStore } from '../ui/astore.jsx'

export default function A17() {
  const { go } = useNav()
  const { toast } = useMStore()
  /* الحظر ينعكس حيًا من قرار الإدارة في C-08 — الاسم والسبب من قاعدة المستخدمين */
  const { users } = useAStore()
  const blocked = users.find((u) => u.type === 'عميل' && u.status === 'blocked')
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-jadeed-black text-white">
      <div className="absolute -left-20 top-24 h-64 w-64 rounded-full bg-jadeed-red/15 blur-3xl" />
      <div className="absolute -right-16 bottom-24 h-56 w-56 rounded-full bg-jadeed-purple/20 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between px-6 pt-4 text-white/70">
        <Logo size={26} />
        <span className="text-[12px] font-medium">٩:٤١</span>
      </div>

      <div className="relative z-10 flex grow flex-col items-center justify-center gap-4 px-9 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 16 }}
          className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-jadeed-red/15 text-[#ff8a70] ring-1 ring-jadeed-red/25"
        >
          <ShieldAlert size={46} strokeWidth={1.6} />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <span className="rounded-full bg-jadeed-red/15 px-3 py-1 text-[10px] font-extrabold tracking-wide text-[#ff8a70]" dir="ltr">
            BLOCKED
          </span>
          <h1 className="mt-3 text-xl font-extrabold">تم حظر حسابك{blocked ? ` يا ${blocked.name.split(' ')[0]}` : ''}</h1>
          <p className="mt-2 text-xs leading-6 text-white/55">
            {blocked && blocked.reason
              ? <>سبب الحظر من الإدارة: <b className="text-white/85">{blocked.reason}</b>. راجع خطوات الاعتراض في الإشعار المرسل — في حال وجود خطأ تواصل مع الدعم.</>
              : <>لا يمكن استخدام الحساب حاليًا. راجع الإشعار المرسل لمعرفة السبب وخطوات الاعتراض — في حال وجود خطأ تواصل مع الدعم.</>}
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="mt-4 w-full space-y-2.5">
          <button
            onClick={() => toast('أُرسل طلبك للدعم — سيصلك رد خلال ٢٤ ساعة (نموذج تجريبي)', 'info')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 py-3.5 text-xs font-extrabold text-white transition hover:bg-white/10"
          >
            <MessageCircle size={15} /> التواصل مع الدعم
          </button>
          <button onClick={() => go('a01')} className="flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold text-white/50 transition hover:text-white/80">
            <LogOut size={15} /> تسجيل الخروج
          </button>
        </motion.div>
      </div>

      <p className="relative z-10 pb-7 text-center text-[10px] text-white/30">A-17 · حالة الحساب المحظور — V3</p>
    </div>
  )
}
