import { motion } from 'framer-motion'
import { ChevronLeft, ClipboardList, Inbox } from 'lucide-react'
import { StatusBar, EmptyState, fadeUp } from '../ui/kit.jsx'
import MerchantNav from '../ui/mnav.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'
import { ORDER_STATE_META, DETAIL_KEY } from '../data/merchant.js'
import { fmt } from '../data/db.js'

/* B-15 — الطلبات الواردة (Manage Incoming Orders) · B-15e الفارغة */
export default function B15({ state = 'default' }) {
  const { go } = useNav()
  const { orders } = useMStore()

  if (state === 'empty') {
    return (
      <div className="flex h-full flex-col bg-jadeed-bg">
        <Header />
        <div className="grow">
          <EmptyState
            icon={Inbox}
            tone="purple"
            title="لا طلبات واردة الآن"
            sub="عند وصول أي طلب جديد سيظهر هنا مع تنبيه فوري — وستصلك إشعار منبّه منفصل"
          />
        </div>
        <MerchantNav active="orders" />
      </div>
    )
  }

  const news = orders.filter((o) => o.status === 'new')
  const active = orders.filter((o) => ['accepted', 'preparing', 'ready', 'delivering'].includes(o.status))
  const done = orders.filter((o) => ['delivered', 'rejected'].includes(o.status)).slice(0, 2)

  const Row = ({ o, i, urgent = false }) => {
    const meta = ORDER_STATE_META[o.status]
    return (
      <motion.button
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={i}
        whileHover={{ y: -1.5 }}
        onClick={() => go(DETAIL_KEY[o.status])}
        className={`w-full rounded-2xl border bg-white p-3.5 text-start shadow-soft transition hover:shadow-pop ${urgent ? 'border-jadeed-orange/40 ring-2 ring-jadeed-orange/15' : 'border-jadeed-line'}`}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-xs font-extrabold" dir="ltr">
            <span className="text-jadeed-purple">#{o.id}</span>
          </p>
          <span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold ${meta.cls}`}>{meta.label}</span>
        </div>
        <p className="mt-1 truncate text-[11px] font-bold">{o.customer} <span className="font-normal text-jadeed-muted">· {o.items.map((it) => `${it.name.split(' ')[0]} ×${it.qty}`).join(' · ')}</span></p>
        <div className="mt-2 flex items-center justify-between border-t border-dashed border-jadeed-line pt-2">
          <span className="text-[10px] font-bold text-jadeed-muted">{o.time}</span>
          <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-jadeed-purple">
            {fmt(o.total)} <ChevronLeft size={13} />
          </span>
        </div>
      </motion.button>
    )
  }

  return (
    <div className="flex h-full flex-col bg-jadeed-bg">
      <Header count={news.length} />
      <div className="no-scrollbar grow overflow-y-auto px-4 pb-4 pt-4">
        {news.length > 0 && (
          <>
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-extrabold text-jadeed-orange">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-jadeed-orange" /> تحتاج إجراءً فوريًا ({news.length})
            </p>
            <div className="space-y-2.5">
              {news.map((o, i) => <Row key={o.id} o={o} i={i} urgent />)}
            </div>
          </>
        )}

        {active.length > 0 && (
          <>
            <p className="mb-2 mt-4 text-[11px] font-extrabold text-jadeed-muted">جارية الآن ({active.length})</p>
            <div className="space-y-2.5">
              {active.map((o, i) => <Row key={o.id} o={o} i={i} />)}
            </div>
          </>
        )}

        {done.length > 0 && (
          <>
            <p className="mb-2 mt-4 text-[11px] font-extrabold text-jadeed-muted">منتهية — آخر ٢٤ ساعة</p>
            <div className="space-y-2.5 opacity-80">
              {done.map((o, i) => <Row key={o.id} o={o} i={i} />)}
            </div>
          </>
        )}
      </div>
      <MerchantNav active="orders" />
    </div>
  )
}

function Header({ count = 0 }) {
  return (
    <div className="relative z-10 border-b border-jadeed-line bg-white px-5 pb-3.5 pt-3">
      <StatusBar />
      <div className="mt-2 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-lg font-extrabold">
          <ClipboardList size={20} className="text-jadeed-purple" /> الطلبات الواردة
        </h1>
        {count > 0 && (
          <span className="flex items-center gap-1.5 rounded-full bg-jadeed-orange-tint px-3 py-1.5 text-[11px] font-extrabold text-jadeed-orange">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-jadeed-orange" /> {count} جديد
          </span>
        )}
      </div>
    </div>
  )
}
