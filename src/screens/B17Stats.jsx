import { motion } from 'framer-motion'
import { BarChart3, Clock, Lock, RefreshCw, Star, TrendingUp } from 'lucide-react'
import { GradHeader, fadeUp } from '../ui/kit.jsx'
import MerchantNav from '../ui/mnav.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'
import { fmt } from '../data/db.js'
import { WEEK_REVENUE } from '../data/merchant.js'

/* B-17 — إحصائيات المتجر · «غير متاحة» · «غير مصرح» (B-17g) */
export default function B17({ state = 'ok' }) {
  const { go } = useNav()
  const { products, toast } = useMStore()

  if (state !== 'ok') {
    const na = state === 'na'
    return (
      <div className="flex h-full flex-col bg-jadeed-bg">
        <GradHeader title="إحصائيات المتجر" onBack={() => go('b07')} />
        <div className="flex grow flex-col items-center justify-center px-8 text-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 240, damping: 16 }}
            className={`mb-4 flex h-20 w-20 items-center justify-center rounded-3xl ${na ? 'bg-jadeed-yellow-tint text-jadeed-yellow-dark' : 'bg-jadeed-red-tint text-jadeed-red'}`}
          >
            {na ? <Clock size={38} strokeWidth={1.6} /> : <Lock size={38} strokeWidth={1.6} />}
          </motion.div>
          <h3 className="text-base font-extrabold">{na ? 'الإحصائيات غير متاحة حاليًا' : 'غير مصرح لك بالإحصائيات'}</h3>
          <p className="mt-1.5 text-xs leading-6 text-jadeed-muted">
            {na
              ? 'خدمة التقارير تحت الصيانة الدورية — حاول بعد قليل، بياناتك محفوظة ولا تُفقد'
              : 'صلاحية التحليلات (getStatistics) غير مفعّلة لحسابك — أرسل طلب تفعيل للإدارة (B-17g)'}
          </p>
          <button
            onClick={() => toast(na ? 'أعدنا المحاولة — لا تزال تحت الصيانة' : 'أُرسل طلب التفعيل للإدارة ✓', na ? 'warn' : 'ok')}
            className={`mt-5 flex items-center gap-2 rounded-2xl px-6 py-3 text-xs font-extrabold shadow-pop transition ${na ? 'bg-jadeed-tint text-jadeed-purple' : 'bg-jadeed-purple text-white hover:bg-jadeed-purple-light'}`}
          >
            <RefreshCw size={14} /> {na ? 'إعادة المحاولة' : 'طلب تفعيل الصلاحية'}
          </button>
        </div>
        <MerchantNav active="stats" />
      </div>
    )
  }

  const max = Math.max(...WEEK_REVENUE.map((w) => w.v))
  const activeCount = products.filter((p) => p.status === 'active').length
  const top = [...products].sort((a, b) => b.sold - a.sold).slice(0, 3)

  const KPI = [
    { label: 'طلبات اليوم', value: '٧', sub: '↑ ٢ عن أمس', Icon: TrendingUp },
    { label: 'إيراد الأسبوع', value: fmt(214500), sub: '↑ ١٨٪', Icon: BarChart3 },
    { label: 'متوسط التقييم', value: '4.5 ★', sub: 'من ٣٢ تقييمًا', Icon: Star },
    { label: 'منتجات نشطة', value: String(activeCount), sub: `من ${products.length} منتجًا`, Icon: BarChart3 },
  ]

  return (
    <div className="flex h-full flex-col bg-jadeed-bg">
      <GradHeader title="إحصائيات المتجر" sub="آخر ٧ أيام — بقالة النور" onBack={() => go('b07')} />

      <div className="no-scrollbar relative z-20 -mt-4 grow overflow-y-auto rounded-t-3xl bg-white px-4 pb-4 pt-5">
        {/* بطاقات KPI */}
        <div className="grid grid-cols-2 gap-2.5">
          {KPI.map((k, i) => (
            <motion.div
              key={k.label}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={i}
              className="rounded-2xl border border-jadeed-line bg-jadeed-bg p-3.5"
            >
              <k.Icon size={16} className="text-jadeed-purple" />
              <p className="mt-1.5 truncate text-lg font-extrabold">{k.value}</p>
              <p className="text-[10px] font-bold text-jadeed-muted">{k.label}</p>
              <p className="mt-0.5 text-[9px] font-extrabold text-jadeed-purple">{k.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* رسم الإيراد الأسبوعي */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-3 rounded-2xl border border-jadeed-line bg-white p-4 shadow-soft">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-extrabold">الإيراد — آخر ٧ أيام</p>
            <span className="rounded-full bg-jadeed-tint px-2 py-0.5 text-[9px] font-extrabold text-jadeed-purple">ريال يمني</span>
          </div>
          <div className="flex h-28 items-end justify-between gap-1.5" dir="ltr">
            {WEEK_REVENUE.map((w, i) => (
              <div key={w.d} className="flex flex-1 flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(w.v / max) * 88}px` }}
                  transition={{ delay: 0.15 + i * 0.06, type: 'spring', stiffness: 120, damping: 20 }}
                  className={`w-full max-w-[26px] rounded-t-lg ${i === WEEK_REVENUE.length - 1 ? 'bg-gradient-to-t from-jadeed-purple to-jadeed-purple-light' : 'bg-jadeed-tint'}`}
                />
                <span className="text-[8px] font-bold text-jadeed-muted" dir="rtl">{w.d}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* الأكثر مبيعًا */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5} className="mt-3 rounded-2xl border border-jadeed-line bg-white p-4 shadow-soft">
          <p className="mb-3 text-xs font-extrabold">الأكثر مبيعًا</p>
          <div className="space-y-3">
            {top.map((p, i) => (
              <div key={p.id} className="flex items-center gap-2.5">
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-extrabold ${i === 0 ? 'bg-jadeed-orange text-white' : 'bg-jadeed-tint text-jadeed-purple'}`}>
                  {i + 1}
                </span>
                <p className="grow truncate text-[11px] font-bold">{p.name}</p>
                <p className="text-[10px] font-bold text-jadeed-muted">{p.sold} عملية بيع</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <MerchantNav active="stats" />
    </div>
  )
}
