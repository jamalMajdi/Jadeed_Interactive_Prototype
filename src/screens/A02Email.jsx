import { motion } from 'framer-motion'
import { ChevronRight, Mail, XCircle } from 'lucide-react'
import { StatusBar, GradHeader, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'

export default function A02({ state = 'default' }) {
  const { go } = useNav()
  const err = state === 'error'

  return (
    <div className="flex h-full flex-col bg-white">
      <GradHeader
        title={err ? 'تسجيل الدخول' : 'إنشاء حساب'}
        sub="أدخل بريدك الإلكتروني لإرسال رمز التحقق"
        onBack={() => go('a01')}
      />

      <div className="relative z-20 -mt-4 grow rounded-t-3xl bg-white px-5 pt-6">
        {err && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, -8, 8, -6, 6, 0] }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-start gap-2 rounded-2xl border border-jadeed-red/20 bg-jadeed-red-tint p-3 text-[11px] leading-5 text-jadeed-red"
          >
            <XCircle size={16} className="mt-0.5 shrink-0" />
            <span>
              <b>تعذر إرسال رمز التحقق.</b> تحقق من اتصالك بالإنترنت ثم أعد المحاولة — تبقّت محاولتان قبل القفل المؤقت (A-02e).
            </span>
          </motion.div>
        )}

        <motion.label variants={fadeUp} initial="hidden" animate="show" className="block">
          <span className="mb-1.5 block text-xs font-bold">البريد الإلكتروني</span>
          <div
            className={`flex items-center gap-2 rounded-2xl border bg-jadeed-bg px-4 py-3.5 transition focus-within:border-jadeed-purple focus-within:bg-white focus-within:shadow-pop ${err ? 'border-jadeed-red/40' : 'border-jadeed-line'}`}
          >
            <Mail size={18} className="shrink-0 text-jadeed-ghost" />
            <input
              dir="ltr"
              className="w-full bg-transparent text-left text-sm outline-none placeholder:text-jadeed-ghost"
              placeholder="name@example.com"
              defaultValue={err ? 'sami@example.com' : ''}
            />
          </div>
          <span className="mt-1.5 block text-[10px] text-jadeed-muted">سنرسل رمزًا من ٤ أرقام إلى هذا البريد</span>
        </motion.label>

        <motion.button
          variants={fadeUp} initial="hidden" animate="show" custom={1}
          onClick={() => go('a03')}
          className="mt-5 w-full rounded-2xl bg-jadeed-orange py-3.5 text-sm font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light active:scale-[.98]"
        >
          {err ? 'أعد المحاولة' : 'متابعة'}
        </motion.button>

        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-6 text-center text-xs text-jadeed-muted">
          لديك حساب بالفعل؟{' '}
          <button onClick={() => go('a01')} className="font-extrabold text-jadeed-purple">سجّل الدخول من هنا</button>
        </motion.p>
      </div>
    </div>
  )
}
