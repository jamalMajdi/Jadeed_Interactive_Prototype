import { motion } from 'framer-motion'
import { KeyRound, Lock } from 'lucide-react'
import { Logo, fadeUp } from '../../ui/kit.jsx'
import { useNav } from '../../ui/nav.jsx'

/* C-01 — تسجيل دخول المشرف (سطح مكتب) */
export default function C01() {
  const { go } = useNav()

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-jadeed-purple via-[#5f0de0] to-jadeed-purple-light">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-jadeed-orange/20 blur-3xl" />

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="relative w-full max-w-sm rounded-3xl bg-white p-7 shadow-phone"
      >
        <div className="mb-5 flex items-center gap-3">
          <Logo size={38} />
          <div>
            <p className="text-sm font-extrabold">جديد · للإدارة</p>
            <p className="text-[10px] text-jadeed-muted">دخول مشرفي النظام فقط</p>
          </div>
        </div>

        <label className="mb-3.5 block">
          <span className="mb-1 block text-[11px] font-bold">البريد الإداري</span>
          <input dir="ltr" defaultValue="admin@jadeed.ye" className="w-full rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 text-left text-xs outline-none focus:border-jadeed-purple focus:bg-white" />
        </label>
        <label className="mb-4 block">
          <span className="mb-1 block text-[11px] font-bold">كلمة المرور</span>
          <div className="flex items-center gap-2 rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 focus-within:border-jadeed-purple focus-within:bg-white">
            <KeyRound size={14} className="text-jadeed-ghost" />
            <input type="password" defaultValue="••••••••" className="w-full bg-transparent text-xs outline-none" />
          </div>
        </label>

        <button
          onClick={() => go('c03')}
          className="w-full rounded-2xl bg-jadeed-orange py-3.5 text-sm font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light active:scale-[.99]"
        >
          <span className="inline-flex items-center gap-2"><Lock size={15} /> دخول لوحة الإدارة</span>
        </button>
        <p className="mt-4 rounded-xl bg-jadeed-tint px-3 py-2 text-center text-[10px] leading-4 text-jadeed-purple">
          الجلسات تُقفل تلقائيًا بعد ١٥ دقيقة خمول — كل عملية تُسجل في سجل النشاط (C-15)
        </p>
      </motion.div>
    </div>
  )
}
