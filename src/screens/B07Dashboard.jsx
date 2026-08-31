import { motion } from 'framer-motion'
import { BarChart3, ChevronLeft, ClipboardList, Inbox, Package, Plus, Star, Store } from 'lucide-react'
import { StatusBar, Logo, RatingChip, fadeUp } from '../ui/kit.jsx'
import MerchantNav from '../ui/mnav.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'
import { ORDER_STATE_META, DETAIL_KEY } from '../data/merchant.js'

/* B-07 — لوحة التاجر (Merchant Dashboard) */
export default function B07() {
  const { go } = useNav()
  const { orders, storeOpen } = useMStore()
  const news = orders.filter((o) => o.status === 'new')
  const active = orders.filter((o) => ['accepted', 'preparing', 'ready', 'delivering'].includes(o.status))
  const recent = orders.filter((o) => ['new', 'preparing', 'ready'].includes(o.status)).slice(0, 3)

  return (
    <div className="flex h-full flex-col bg-jadeed-bg">
      <div className="relative z-10 bg-gradient-to-b from-jadeed-purple to-jadeed-purple-light px-5 pb-12 pt-3 text-white">
        <StatusBar light />
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <div className="leading-tight">
              <p className="text-sm font-extrabold">لوحة التاجر</p>
              <p className="text-[10px] text-white/70">بقالة النور · موثّق ✓</p>
            </div>
          </div>
          <RatingChip value={4.5} />
        </div>
      </div>

      <div className="no-scrollbar relative z-20 -mt-7 grow overflow-y-auto px-4 pb-4">
        {/* بطاقتا الطلبات */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            variants={fadeUp} initial="hidden" animate="show"
            whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
            onClick={() => go('b15')}
            className="rounded-2xl bg-jadeed-orange p-4 text-start text-white shadow-pop transition hover:bg-jadeed-orange-light"
          >
            <Inbox size={20} />
            <p className="mt-2 text-2xl font-extrabold">{news.length}</p>
            <p className="text-[11px] font-bold text-white/85">طلبات جديدة — تحتاج إجراءً</p>
          </motion.button>
          <motion.button
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
            onClick={() => go('b15')}
            className="rounded-2xl border border-jadeed-line bg-white p-4 text-start shadow-soft transition hover:shadow-pop"
          >
            <ClipboardList size={20} className="text-jadeed-purple" />
            <p className="mt-2 text-2xl font-extrabold">{active.length}</p>
            <p className="text-[11px] font-bold text-jadeed-muted">طلبات جارية الآن</p>
          </motion.button>
        </div>

        {/* حالة المتجر — تنعكس فورًا من مفتاح «متجري» (B-09) */}
        <motion.button
          variants={fadeUp} initial="hidden" animate="show" custom={1.5}
          onClick={() => go('b09')}
          className={`mt-3 flex w-full items-center justify-between rounded-2xl border p-3 text-start shadow-soft transition hover:shadow-pop ${storeOpen ? 'border-jadeed-purple/25 bg-jadeed-tint' : 'border-jadeed-yellow/30 bg-jadeed-yellow-tint'}`}
        >
          <span className="flex items-center gap-2">
            <span className={`h-2 w-2 shrink-0 rounded-full ${storeOpen ? 'animate-pulse bg-jadeed-purple' : 'bg-jadeed-yellow'}`} />
            <span className={`text-[11px] font-extrabold ${storeOpen ? 'text-jadeed-purple' : 'text-jadeed-yellow-dark'}`}>
              {storeOpen ? 'متجرك مفتوح ويستقبل الطلبات الآن' : 'متجرك مغلق مؤقتًا — لا يستقبل طلبات'}
            </span>
          </span>
          <span className="text-[10px] font-bold text-jadeed-muted">إدارة المتجر ←</span>
        </motion.button>

        {/* الاختصارات */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-3 grid grid-cols-4 gap-2">
          {[
            { Icon: Package, label: 'منتجاتي', to: 'b10' },
            { Icon: Plus, label: 'إضافة منتج', to: 'b11' },
            { Icon: Store, label: 'متجري', to: 'b09' },
            { Icon: BarChart3, label: 'الإحصائيات', to: 'b17' },
          ].map(({ Icon, label, to }) => (
            <button
              key={label}
              onClick={() => go(to)}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-jadeed-line bg-white px-1 py-3 shadow-soft transition hover:shadow-pop"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-jadeed-tint text-jadeed-purple">
                <Icon size={17} />
              </span>
              <span className="text-[9.5px] font-extrabold text-jadeed-muted">{label}</span>
            </button>
          ))}
        </motion.div>

        {/* أحدث الطلبات */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-extrabold">أحدث الطلبات</p>
            <button onClick={() => go('b15')} className="text-[11px] font-extrabold text-jadeed-purple">عرض الكل</button>
          </div>
          <div className="space-y-2">
            {recent.map((o) => {
              const meta = ORDER_STATE_META[o.status]
              return (
                <button
                  key={o.id}
                  onClick={() => go(DETAIL_KEY[o.status])}
                  className="flex w-full items-center gap-3 rounded-2xl border border-jadeed-line bg-white p-3 text-start shadow-soft transition hover:shadow-pop"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-jadeed-bg text-[10px] font-extrabold text-jadeed-purple" dir="ltr">
                    #{o.id}
                  </span>
                  <span className="min-w-0 grow">
                    <span className="block truncate text-xs font-extrabold">{o.customer}</span>
                    <span className="block truncate text-[10px] text-jadeed-muted">{o.time} · {o.items.length} عناصر</span>
                  </span>
                  <span className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-extrabold ${meta.cls}`}>{meta.label}</span>
                  <ChevronLeft size={14} className="shrink-0 text-jadeed-ghost" />
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* تلميح تقييم */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-3 flex items-center gap-2.5 rounded-2xl bg-jadeed-yellow-tint p-3.5 text-[11px] font-bold leading-5 text-jadeed-yellow-dark">
          <Star size={16} className="shrink-0" fill="currentColor" strokeWidth={0} />
          تقييمك هذا الأسبوع 4.5 ★ — أسرع في التحضير لرفع تقييم متجرك
        </motion.div>
      </div>

      <MerchantNav active="home" />
    </div>
  )
}
