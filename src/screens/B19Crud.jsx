import { motion } from 'framer-motion'
import { CloudOff, Database, Link2, RefreshCw, ShieldAlert } from 'lucide-react'
import { GradHeader, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'

/* B-19 — فشل عمليات المنتجات: نمط موحّد DD-12 (V3) */
export default function B19() {
  const { go } = useNav()
  const { toast } = useMStore()

  const FAILS = [
    { Icon: Database, title: 'فشل النشر — «بيض بلدي — طبق ٣٠»', why: 'خطأ من قاعدة البيانات (ERR_DB_502)', btn: 'إعادة المحاولة', tone: 'err' },
    { Icon: Link2, title: 'فشل الحذف — «طماطم بلدي طازجة»', why: 'المنتج مرتبط بطلب جارٍ #1051 — أنهِ الطلب أولًا', btn: 'عرض الطلب', tone: 'warn' },
    { Icon: CloudOff, title: 'فشل حفظ التعديلات — انقطاع الاتصال', why: 'حُفظ التعديل محليًا وسيُزامن تلقائيًا عند عودة الشبكة', btn: 'حسنًا', tone: 'info' },
    { Icon: ShieldAlert, title: 'غير مصرح — انتهت الجلسة', why: 'سجّل الدخول من جديد لمتابعة إدارة المنتجات', btn: 'تسجيل الدخول', tone: 'err' },
  ]

  const TONES = {
    err: 'border-jadeed-red/25 bg-jadeed-red-tint text-jadeed-red',
    warn: 'border-jadeed-yellow/30 bg-jadeed-yellow-tint text-jadeed-yellow-dark',
    info: 'border-jadeed-line bg-jadeed-bg text-jadeed-muted',
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <GradHeader title="فشل عمليات المنتجات" sub="حالات الخطأ V3 — بنمط موحّد (DD-12)" onBack={() => go('b10')} />

      <div className="no-scrollbar relative z-20 -mt-4 grow overflow-y-auto rounded-t-3xl bg-white px-5 pb-6 pt-5">
        <div className="space-y-3">
          {FAILS.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={i}
              className={`rounded-2xl border p-3.5 ${TONES[f.tone]}`}
            >
              <div className="flex items-start gap-2.5">
                <f.Icon size={18} className="mt-0.5 shrink-0" />
                <div className="grow">
                  <p className="text-xs font-extrabold leading-5">{f.title}</p>
                  <p className="mt-0.5 text-[11px] leading-5 opacity-80">{f.why}</p>
                </div>
              </div>
              <button
                onClick={() => toast('جارٍ إعادة المحاولة…', 'info')}
                className="mt-2.5 flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-[10px] font-extrabold shadow-soft transition hover:shadow-pop"
              >
                <RefreshCw size={11} /> {f.btn}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-4 rounded-xl bg-jadeed-tint px-3 py-2 text-[10px] leading-4 text-jadeed-purple">
          لكل فشل: ماذا حدث + ماذا يفعل التاجر الآن + زر إجراء — لا رسائل تقنية مبهمة (قاعدة DD-12)
        </p>
      </div>
    </div>
  )
}
