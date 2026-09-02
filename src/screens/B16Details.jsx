import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bike, Check, ChevronRight, MapPin, Pencil, Phone, StickyNote, XCircle } from 'lucide-react'
import { Dialog, GradHeader, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'
import { ORDER_STATE_META, ORDER_FLOW, SEED_ORDERS } from '../data/merchant.js'
import { fmt } from '../data/db.js'

/* أسباب الرفض المعتادة — العميل يراها في A-14r والرفض يُشعر به عبر sendNotification
   (STATE_Order: reject / notifyUser() · ACT_ManageOrderLifeCycle: Reject order → notify customer) */
const REJECT_REASONS = [
  'نفدت الكمية — المنتج غير متوفر حاليًا',
  'المتجر مغلق مؤقتًا الآن',
  'العنوان خارج نطاق التوصيل',
]

/* B-16 — تفاصيل الطلب بسبع حالاتها: جديد/مقبول/تحضير/جاهز/توصيل/تم/مرفوض */
export default function B16({ state = 'new' }) {
  const { go } = useNav()
  const { orders, accept, startPrep, markReady, handOver, markDelivered, reject } = useMStore()
  const [rejOpen, setRejOpen] = useState(false)
  const [reason, setReason] = useState(REJECT_REASONS[0])

  const order = orders.find((o) => o.status === state) || SEED_ORDERS.find((o) => o.status === state)
  const meta = ORDER_STATE_META[order.status]
  const flowIdx = ORDER_FLOW.indexOf(order.status)

  return (
    <div className="flex h-full flex-col bg-jadeed-bg">
      <GradHeader title={`الطلب #${order.id}`} sub={`${order.customer} · ${order.time}`} onBack={() => go('b15')}>
        <span className={`ms-auto shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${meta.cls}`}>{meta.label}</span>
      </GradHeader>

      <div className="no-scrollbar grow overflow-y-auto px-4 pb-4 pt-4">
        {/* شريط تقدم الحالات */}
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-jadeed-line bg-white px-3 py-2.5 shadow-soft">
          {ORDER_FLOW.map((s, i) => (
            <div key={s} className="flex flex-1 items-center justify-center">
              <span
                className={`h-2.5 w-2.5 rounded-full transition-colors ${order.status === 'rejected' ? 'bg-jadeed-gray' : i <= flowIdx ? 'bg-jadeed-purple' : 'bg-jadeed-line'}`}
                title={ORDER_STATE_META[s].label}
              />
              {i < ORDER_FLOW.length - 1 && <span className={`mx-0.5 h-0.5 flex-1 rounded-full ${i < flowIdx && order.status !== 'rejected' ? 'bg-jadeed-purple/40' : 'bg-jadeed-line'}`} />}
            </div>
          ))}
          {order.status === 'rejected' && <XCircle size={14} className="ms-1 shrink-0 text-jadeed-red" />}
        </div>

        {/* بيانات العميل */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="rounded-2xl border border-jadeed-line bg-white p-3.5 shadow-soft">
          <p className="text-xs font-extrabold">{order.customer}</p>
          <p className="mt-1 flex items-start gap-1.5 text-[11px] text-jadeed-muted">
            <MapPin size={13} className="mt-0.5 shrink-0 text-jadeed-purple" /> {order.address}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span dir="ltr" className="flex items-center gap-1 rounded-lg bg-jadeed-bg px-2 py-1 text-[10px] font-bold text-jadeed-muted">
              <Phone size={11} /> {order.phone}
            </span>
            {order.note && (
              <span className="flex items-center gap-1 rounded-lg bg-jadeed-yellow-tint px-2 py-1 text-[10px] font-bold text-jadeed-yellow-dark">
                <StickyNote size={11} /> {order.note}
              </span>
            )}
          </div>
        </motion.div>

        {/* عناصر الطلب */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="mt-3 rounded-2xl border border-jadeed-line bg-white p-4 shadow-soft">
          <p className="mb-3 text-xs font-extrabold">عناصر الطلب ({order.items.length})</p>
          <div className="space-y-2.5">
            {order.items.map((it, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-jadeed-tint text-[10px] font-extrabold text-jadeed-purple">×{it.qty}</span>
                <p className="grow truncate text-[11px] font-bold">{it.name}</p>
                <p className="text-[11px] font-bold text-jadeed-muted">{fmt(it.price * it.qty)}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-dashed border-jadeed-line pt-3">
            <span className="text-xs font-extrabold">الإجمالي (دفع عند الاستلام)</span>
            <span className="text-base font-extrabold text-jadeed-purple">{fmt(order.total)}</span>
          </div>
        </motion.div>

        {/* بانرات الحالات السلبية */}
        {order.status === 'delivering' && (
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-3 flex items-start gap-2 rounded-2xl bg-jadeed-tint p-3.5 text-[11px] leading-5 text-jadeed-purple">
            <Bike size={16} className="mt-0.5 shrink-0" />
            الطلب مع المندوب — بانتظار تأكيد التسليم من العميل بتوقيعه (getSignature)
          </motion.div>
        )}
        {order.status === 'delivered' && (
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-3 flex items-center gap-2 rounded-2xl border border-jadeed-line bg-white p-3.5 text-[11px] font-bold text-jadeed-muted shadow-soft">
            <Pencil size={14} className="text-jadeed-purple" /> ✍ تم التسليم وتوقيع العميل — أُقفل الطلب
          </motion.div>
        )}
        {order.status === 'rejected' && (
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-3 rounded-2xl border border-jadeed-red/25 bg-jadeed-red-tint p-3.5 text-[11px] leading-5 text-jadeed-red">
            <b>سبب الرفض:</b> {order.reason} — أُشعر العميل عبر إشعار (sendNotification)
          </motion.div>
        )}
      </div>

      {/* شريط الإجراءات حسب الحالة */}
      <div className="z-10 border-t border-jadeed-line bg-white p-4 shadow-card">
        {order.status === 'new' && (
          <div className="flex gap-2.5">
            <button
              onClick={() => setRejOpen(true)}
              className="w-1/3 rounded-2xl border-2 border-jadeed-red/30 py-3 text-xs font-extrabold text-jadeed-red transition hover:bg-jadeed-red-tint"
            >
              رفض
            </button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { accept(order.id); go('b16a') }}
              className="flex grow items-center justify-center gap-1.5 rounded-2xl bg-jadeed-orange py-3.5 text-sm font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light"
            >
              <Check size={17} strokeWidth={2.8} /> قبول الطلب
            </motion.button>
          </div>
        )}
        {order.status === 'accepted' && (
          <ActionButton label="بدء التحضير" onClick={() => { startPrep(order.id); go('b16p') }} />
        )}
        {order.status === 'preparing' && (
          <ActionButton label="الطلب جاهز للاستلام ✓" sub="finishPreparation · notifyCourier" onClick={() => { markReady(order.id); go('b16r') }} />
        )}
        {order.status === 'ready' && (
          <ActionButton label="تسليم الطلب للمندوب" sub="handToCourier" icon={<Bike size={16} />} onClick={() => { handOver(order.id); go('b16s') }} />
        )}
        {order.status === 'delivering' && (
          <ActionButton label="تأكيد التسليم بتوقيع العميل" sub="getSignature · notify customer" icon={<Pencil size={16} />} onClick={() => { markDelivered(order.id); go('b16d') }} />
        )}
        {order.status === 'delivered' && (
          <div className="space-y-2.5">
            <button onClick={() => go('b17')} className="w-full rounded-2xl bg-jadeed-purple py-3.5 text-xs font-extrabold text-white shadow-pop transition hover:bg-jadeed-purple-light">
              عرض إحصائيات المتجر
            </button>
            <button onClick={() => go('b15')} className="w-full rounded-2xl border border-jadeed-line py-3 text-xs font-extrabold text-jadeed-muted transition hover:bg-jadeed-bg">
              <span className="inline-flex items-center gap-1.5"><ChevronRight size={14} /> العودة للطلبات الواردة</span>
            </button>
          </div>
        )}
        {order.status === 'rejected' && (
          <button onClick={() => go('b15')} className="w-full rounded-2xl border border-jadeed-line py-3 text-xs font-extrabold text-jadeed-muted transition hover:bg-jadeed-bg">
            <span className="inline-flex items-center gap-1.5"><ChevronRight size={14} /> العودة للطلبات</span>
          </button>
        )}
      </div>

      {/* حوار سبب الرفض — السبب إلزامي لأنه يُشعر به العميل (A-14r يعرضه حرفيًا) */}
      {rejOpen && (
        <Dialog>
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-jadeed-red-tint text-jadeed-red">
              <XCircle size={24} />
            </span>
            <div>
              <h3 className="text-sm font-extrabold">رفض الطلب <span dir="ltr" className="text-jadeed-purple">#{order.id}</span>؟</h3>
              <p className="mt-1 text-[11px] leading-5 text-jadeed-muted">اختر سبب الرفض — سيصله إشعار فوري بالسبب نفسه (notifyUser)</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {REJECT_REASONS.map((r) => (
              <button
                key={r}
                onClick={() => setReason(r)}
                className={`flex w-full items-center gap-2.5 rounded-2xl border-2 p-3 text-start text-[11px] font-bold transition ${reason === r ? 'border-jadeed-purple bg-jadeed-tint text-jadeed-purple' : 'border-jadeed-line bg-white text-jadeed-muted'}`}
              >
                <span className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 ${reason === r ? 'border-jadeed-purple' : 'border-jadeed-line'}`}>
                  {reason === r && <span className="h-2 w-2 rounded-full bg-jadeed-purple" />}
                </span>
                {r}
              </button>
            ))}
          </div>

          <div className="mt-5 flex gap-2.5">
            <button
              onClick={() => setRejOpen(false)}
              className="w-1/3 rounded-2xl border border-jadeed-line py-3 text-xs font-extrabold text-jadeed-muted transition hover:bg-jadeed-bg"
            >
              تراجع
            </button>
            <button
              onClick={() => { reject(order.id, reason); go('b16rej') }}
              className="w-2/3 rounded-2xl bg-jadeed-red py-3 text-xs font-extrabold text-white shadow-pop transition hover:opacity-90"
            >
              تأكيد الرفض وإشعار العميل
            </button>
          </div>
        </Dialog>
      )}
    </div>
  )
}

function ActionButton({ label, sub, icon, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full rounded-2xl bg-jadeed-orange py-3.5 text-sm font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light"
    >
      <span className="inline-flex items-center gap-2">{icon}{label}</span>
      {sub && <span className="mt-0.5 block text-[9px] font-bold text-white/70" dir="ltr">{sub}</span>}
    </motion.button>
  )
}
