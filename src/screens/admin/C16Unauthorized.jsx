import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { useNav } from '../../ui/nav.jsx'

/* C-16 — حالة «وصول غير مصرح» (Unauthorized) */
export default function C16() {
  const { go } = useNav()

  return (
    <div className="flex h-full w-full items-center justify-center bg-jadeed-bg">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-sm rounded-3xl border border-jadeed-line bg-white p-8 text-center shadow-card"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-jadeed-red-tint text-jadeed-red">
          <Lock size={38} strokeWidth={1.6} />
        </div>
        <p className="mt-4 text-4xl font-extrabold tracking-widest text-jadeed-gray" dir="ltr">403</p>
        <h3 className="mt-1 text-base font-extrabold">وصول غير مصرح</h3>
        <p className="mt-2 text-xs leading-6 text-jadeed-muted">
          لا تملك صلاحية الوصول لهذه الشاشة بدورك الحالي — راجع «أدوار المشرفين» أو اطلب ترقية الصلاحية من مدير عام
        </p>
        <button
          onClick={() => go('c03')}
          className="mt-5 rounded-2xl bg-jadeed-purple px-6 py-3 text-xs font-extrabold text-white shadow-pop transition hover:bg-jadeed-purple-light"
        >
          العودة لشاشة آمنة
        </button>
      </motion.div>
    </div>
  )
}
