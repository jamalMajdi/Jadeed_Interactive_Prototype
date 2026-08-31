import { motion } from 'framer-motion'
import { AlertTriangle, MessageCircle, RotateCcw, XCircle } from 'lucide-react'
import { StatusBar, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'

/* B-06 — إشعار رفض طلب التاجر + إعادة التقديم (M3) */
export default function B06() {
  const { go } = useNav()
  const { toast } = useMStore()

  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />

      <div className="flex grow flex-col items-center justify-center px-7 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ opacity: 1, scale: 1, x: [0, -8, 8, -5, 5, 0] }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-jadeed-red-tint text-jadeed-red"
        >
          <XCircle size={40} strokeWidth={1.6} />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <h1 className="text-lg font-extrabold">تم رفض طلب التسجيل</h1>
          <p className="mt-1.5 text-xs leading-6 text-jadeed-muted">راجع السبب أدناه، صحّحه، ثم أعد التقديم — طلبك القادم له أولوية مراجعة (M3)</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="mt-5 w-full rounded-3xl border border-jadeed-red/20 bg-jadeed-red-tint p-4 text-start">
          <p className="flex items-center gap-1.5 text-[11px] font-extrabold text-jadeed-red">
            <AlertTriangle size={14} /> سبب الرفض
          </p>
          <p className="mt-1.5 text-xs leading-5 text-jadeed-black">
            صورة واجهة المتجر غير واضحة — أعد التصوير في إضاءة نهارية بحيث يظهر اسم المتجر كاملًا.
          </p>
          <p className="mt-2 border-t border-jadeed-red/10 pt-2 text-[10px] text-jadeed-muted">
            طلب الرقم #REQ-2891 · رُفض بتاريخ ٢٩ أغسطس · المراجع: فريق التفعيل
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-6 w-full space-y-2.5">
          <button
            onClick={() => go('b04')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-jadeed-orange py-3.5 text-sm font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light active:scale-[.98]"
          >
            <RotateCcw size={16} /> إعادة التقديم الآن
          </button>
          <button
            onClick={() => toast('أُرسل اعتراضك للدعم — سيتواصل فريق «جديد» معك قريبًا', 'info')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-jadeed-line py-3 text-xs font-extrabold text-jadeed-purple transition hover:bg-jadeed-tint"
          >
            <MessageCircle size={15} /> التواصل مع الدعم
          </button>
        </motion.div>
      </div>
    </div>
  )
}
