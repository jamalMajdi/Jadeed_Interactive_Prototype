import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, XCircle } from 'lucide-react'
import { StatusBar, GradHeader } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'

export default function A03({ state = 'default' }) {
  const { go } = useNav()
  const err = state === 'error'
  const refs = useRef([])
  const doneRef = useRef(false)
  const [vals, setVals] = useState(err ? ['4', '9', '2', '7'] : ['', '', '', ''])
  const [t, setT] = useState(32)
  const [verifying, setVerifying] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setT((x) => (x > 0 ? x - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])

  const onCh = (i, v) => {
    const d = v.replace(/\D/g, '').slice(-1)
    setVals((p) => {
      const n = [...p]
      n[i] = d
      return n
    })
    if (d && i < 3) refs.current[i + 1]?.focus()
  }

  /* Backspace على خانة فارغة → رجوع للخانة السابقة (سلوك OTP المعياري) */
  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !vals[i] && i > 0) refs.current[i - 1]?.focus()
  }

  /* لصق الرمز كاملًا → يوزَّع على الخانات الأربع (dir=ltr) */
  const onPaste = (e) => {
    const digits = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 4)
    if (!digits) return
    e.preventDefault()
    setVals((p) => digits.split('').map((d, i) => d || p[i]))
    refs.current[Math.min(digits.length, 3)]?.focus()
  }

  /* تحقق تلقائي فور اكتمال الخانات — خطوة «Verify code» في ACT_AccountRegistration(Login) */
  useEffect(() => {
    if (err || verifying || doneRef.current) return
    if (vals.every((v) => v !== '')) {
      doneRef.current = true
      setVerifying(true)
      const id = setTimeout(() => go('a04'), 600)
      return () => clearTimeout(id)
    }
  }, [vals, err, verifying])

  return (
    <div className="flex h-full flex-col bg-white">
      <GradHeader title="رمز التحقق" sub="أرسلنا رمزًا من ٤ أرقام إلى" onBack={() => go('a02')}>
        <span dir="ltr" className="text-[11px] font-bold text-white/70">sami@example.com</span>
      </GradHeader>

      <div className="relative z-20 -mt-4 grow rounded-t-3xl bg-white px-5 pt-8">
        <motion.div
          animate={err ? { x: [0, -9, 9, -7, 7, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-3"
          dir="ltr"
          onPaste={onPaste}
        >
          {vals.map((v, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              value={v}
              onChange={(e) => onCh(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              inputMode="numeric"
              aria-label={`خانة الرمز ${i + 1}`}
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              className={`h-14 w-14 rounded-2xl border-2 bg-jadeed-bg text-center text-xl font-extrabold outline-none transition focus:border-jadeed-purple focus:bg-white focus:shadow-pop ${err ? 'border-jadeed-red/50 text-jadeed-red' : 'border-jadeed-line'}`}
            />
          ))}
        </motion.div>

        {err ? (
          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] font-bold text-jadeed-red">
            <XCircle size={14} /> رمز غير صحيح — تبقّت محاولتان ثم يُقفل الإرسال مؤقتًا
          </p>
        ) : (
          <p className="mt-4 text-center text-[11px] text-jadeed-muted">لم يصلك الرمز؟ تحقق من مجلد البريد غير المرغوب</p>
        )}

        <button
          onClick={() => { setT(32); setVals(['', '', '', '']); refs.current[0]?.focus() }}
          disabled={t > 0}
          className={`mx-auto mt-5 flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-extrabold transition ${t > 0 ? 'bg-jadeed-bg text-jadeed-ghost' : 'bg-jadeed-tint text-jadeed-purple hover:shadow-pop'}`}
        >
          <RotateCcw size={13} />
          {t > 0 ? `إعادة الإرسال خلال 0:${String(t).padStart(2, '0')}` : 'إعادة إرسال الرمز'}
        </button>

        <button
          onClick={() => go('a04')}
          disabled={verifying}
          className={`mt-8 w-full rounded-2xl py-3.5 text-sm font-extrabold text-white shadow-pop transition ${verifying ? 'bg-jadeed-purple-light' : 'bg-jadeed-orange hover:bg-jadeed-orange-light active:scale-[.98]'}`}
        >
          {verifying ? 'جارٍ التحقق…' : err ? 'تحقق مرة أخرى' : 'تحقق ومتابعة'}
        </button>
      </div>
    </div>
  )
}
