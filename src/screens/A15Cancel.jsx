import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Dialog, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'
import A14 from './A14Tracking.jsx'

const REASONS = ['تأخر الطلب كثيرًا', 'تغيّرت خطتي', 'أريد تعديل الطلب']

export default function A15() {
  const { go } = useNav()
  const { toast } = useMStore()
  const [reason, setReason] = useState(REASONS[0])

  return (
    <div className="relative h-full">
      {/* الشاشة الأصلية خلف المودال */}
      <div className="h-full pointer-events-none">
        <A14 state="cancel" />
      </div>

      <Dialog>
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-jadeed-yellow-tint text-jadeed-yellow-dark">
            <AlertTriangle size={24} />
          </span>
          <div>
            <h3 className="text-sm font-extrabold">إلغاء الطلب <span dir="ltr" className="text-jadeed-purple">#1051</span>؟</h3>
            <p className="mt-1 text-[11px] leading-5 text-jadeed-muted">اختر سبب الإلغاء — يساعدنا ذلك على تحسين الخدمة (A-15)</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {REASONS.map((r, i) => (
            <motion.button
              key={r}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={i}
              onClick={() => setReason(r)}
              className={`flex w-full items-center gap-2.5 rounded-2xl border-2 p-3 text-start text-xs font-bold transition ${reason === r ? 'border-jadeed-purple bg-jadeed-tint text-jadeed-purple' : 'border-jadeed-line bg-white text-jadeed-muted'}`}
            >
              <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${reason === r ? 'border-jadeed-purple' : 'border-jadeed-line'}`}>
                {reason === r && <span className="h-2 w-2 rounded-full bg-jadeed-purple" />}
              </span>
              {r}
            </motion.button>
          ))}
        </div>

        <div className="mt-5 flex gap-2.5">
          <button
            onClick={() => go('a14')}
            className="w-1/3 rounded-2xl border border-jadeed-line py-3 text-xs font-extrabold text-jadeed-muted transition hover:bg-jadeed-bg"
          >
            تراجع
          </button>
          <button
            onClick={() => { toast(`أُلغي الطلب #1051 (السبب: ${reason}) — لن يُخصم أي مبلغ`, 'warn'); go('a13') }}
            className="w-2/3 rounded-2xl bg-jadeed-red py-3 text-xs font-extrabold text-white shadow-pop transition hover:opacity-90"
          >
            تأكيد الإلغاء
          </button>
        </div>
      </Dialog>
    </div>
  )
}
