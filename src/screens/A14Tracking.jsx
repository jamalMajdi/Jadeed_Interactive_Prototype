import { motion } from 'framer-motion'
import { ChevronRight, Bike, Check, X, AlertTriangle, MessageCircle, PackageX } from 'lucide-react'
import { StatusBar, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'
import { fmt } from '../data/db.js'

/* الحالة الافتراضية / القابلة للإلغاء — طلب #1051 */
function Active({ cancellable }) {
  const { go } = useNav()
  const steps = [
    { label: 'تم استلام الطلب', time: '٣:٤١ م', done: true },
    { label: 'قيد التحضير', time: 'الآن', done: true, current: true },
    { label: 'جاهز للاستلام', time: '—', done: false },
    { label: 'خارج للتوصيل', time: '—', done: false },
    { label: 'تم التسليم', time: '—', done: false },
  ]

  return (
    <>
      {/* بطاقة الوصول */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="mx-4 mt-4 flex items-center gap-3 rounded-2xl border border-jadeed-line bg-white p-4 shadow-soft">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-jadeed-tint text-jadeed-purple">
          <Bike size={24} />
        </span>
        <div className="grow">
          <p className="text-xs font-extrabold">يصل خلال ~٢٠ دقيقة</p>
          <p className="mt-0.5 text-[11px] text-jadeed-muted">بقالة النور · ٣ عناصر · {fmt(9800)}</p>
        </div>
        <span className="rounded-full bg-jadeed-yellow-tint px-2.5 py-1 text-[10px] font-extrabold text-jadeed-yellow-dark">قيد التحضير</span>
      </motion.div>

      {/* الخط الزمني */}
      <div className="no-scrollbar grow overflow-y-auto px-6 pb-4 pt-6">
        {steps.map((s, i) => (
          <motion.div key={s.label} variants={fadeUp} initial="hidden" animate="show" custom={i} className="relative flex gap-3.5 pb-7">
            {/* الخط الواصل */}
            {i < steps.length - 1 && (
              <span className={`absolute right-[13px] top-7 h-[calc(100%-24px)] w-0.5 rounded-full ${s.done ? 'bg-jadeed-purple/40' : 'bg-jadeed-line'}`} />
            )}
            {/* النقطة */}
            {s.current ? (
              <span className="relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center">
                <motion.span
                  animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full bg-jadeed-orange/40"
                />
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-jadeed-orange text-white shadow-soft">
                  <Check size={14} strokeWidth={3} />
                </span>
              </span>
            ) : (
              <span className={`z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${s.done ? 'bg-jadeed-purple text-white' : 'border-2 border-jadeed-line bg-white'}`}>
                {s.done && <Check size={13} strokeWidth={3} />}
              </span>
            )}
            <div className="pt-0.5">
              <p className={`text-xs ${s.current || s.done ? 'font-extrabold text-jadeed-black' : 'font-bold text-jadeed-ghost'}`}>{s.label}</p>
              <p className="mt-0.5 text-[10px] text-jadeed-muted">{s.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {cancellable && (
        <div className="z-10 border-t border-jadeed-line bg-white p-4 shadow-card">
          <button
            onClick={() => go('a15')}
            className="w-full rounded-2xl border-2 border-jadeed-red/30 bg-white py-3 text-xs font-extrabold text-jadeed-red transition hover:bg-jadeed-red-tint"
          >
            إلغاء الطلب
          </button>
          <p className="mt-2 text-center text-[10px] text-jadeed-muted">الإلغاء متاح قبل خروج الطلب للتوصيل</p>
        </div>
      )}
    </>
  )
}

/* الطلب المرفوض — A-14r */
function Rejected() {
  const { go } = useNav()
  const { toast } = useMStore()
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 mt-4 flex items-start gap-2.5 rounded-2xl border border-jadeed-red/25 bg-jadeed-red-tint p-3.5 text-[11px] leading-5 text-jadeed-red"
      >
        <AlertTriangle size={17} className="mt-0.5 shrink-0" />
        <span>
          <b>اعتذر المتجر عن طلبك:</b> المنتج غير متوفر حاليًا. المبلغ المستحق لا يشمل هذا الطلب — لم يُخصم أي مبلغ.
        </span>
      </motion.div>

      <div className="no-scrollbar grow overflow-y-auto px-6 pb-4 pt-6">
        <div className="relative flex gap-3.5 pb-7">
          <span className="absolute right-[13px] top-7 h-[calc(100%-24px)] w-0.5 rounded-full bg-jadeed-line" />
          <span className="z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-jadeed-purple text-white">
            <Check size={13} strokeWidth={3} />
          </span>
          <div className="pt-0.5">
            <p className="text-xs font-extrabold">تم استلام الطلب</p>
            <p className="mt-0.5 text-[10px] text-jadeed-muted">٩:١٥ ص</p>
          </div>
        </div>
        <div className="relative flex gap-3.5">
          <span className="z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-jadeed-red text-white shadow-soft">
            <X size={14} strokeWidth={3} />
          </span>
          <div className="pt-0.5">
            <p className="text-xs font-extrabold text-jadeed-red">مرفوض من المتجر</p>
            <p className="mt-0.5 text-[10px] text-jadeed-muted">٩:٢٢ ص · انتهى مسار الطلب (A-14r)</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-jadeed-line bg-white p-4 text-[11px] leading-5 text-jadeed-muted shadow-soft">
          يمكنك التواصل مع الدعم للاعتراض أو الاستفسار عن سبب الرفض — راجع أيضًا إشعار الرفض المرسل إليك (sendNotification).
        </div>
      </div>

      <div className="z-10 space-y-2.5 border-t border-jadeed-line bg-white p-4 shadow-card">
        <button
          onClick={() => toast('أُرسل طلبك للدعم — سيصلك رد خلال ٢٤ ساعة (نموذج تجريبي)', 'info')}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-jadeed-line py-3 text-xs font-extrabold text-jadeed-purple transition hover:bg-jadeed-tint"
        >
          <MessageCircle size={15} /> التواصل مع الدعم
        </button>
        <button
          onClick={() => go('a13')}
          className="w-full rounded-2xl bg-jadeed-purple py-3.5 text-xs font-extrabold text-white shadow-pop transition hover:bg-jadeed-purple-light"
        >
          العودة إلى طلباتي
        </button>
      </div>
    </>
  )
}

export default function A14({ state = 'default' }) {
  const { go } = useNav()
  const rejected = state === 'rejected'

  return (
    <div className="flex h-full flex-col bg-jadeed-bg">
      <div className="relative z-10 border-b border-jadeed-line bg-white px-5 pb-4 pt-3">
        <StatusBar />
        <div className="mt-2 flex items-center gap-3">
          <button onClick={() => go('a13')} className="rounded-full bg-jadeed-bg p-2 text-jadeed-black">
            <ChevronRight size={18} />
          </button>
          <h1 className="text-lg font-extrabold">تتبع الطلب</h1>
          <span dir="ltr" className="text-sm font-extrabold text-jadeed-purple">#{rejected ? 1036 : 1051}</span>
          <span className={`mr-auto rounded-full px-2.5 py-1 text-[10px] font-extrabold ${rejected ? 'bg-jadeed-red-tint text-jadeed-red' : 'bg-jadeed-yellow-tint text-jadeed-yellow-dark'}`}>
            {rejected ? 'مرفوض' : 'قيد التحضير'}
          </span>
        </div>
      </div>

      {rejected ? <Rejected /> : <Active cancellable={state === 'cancel'} />}
    </div>
  )
}
