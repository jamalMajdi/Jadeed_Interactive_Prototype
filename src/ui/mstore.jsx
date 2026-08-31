import { createContext, useCallback, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { SEED_ORDERS, SEED_PRODUCTS } from '../data/merchant.js'

/* مخزن حالة التاجر: منتجات + طلبات + تنبيهات Toast حية */
const MStoreCtx = createContext(null)
export const useMStore = () => useContext(MStoreCtx)

const TONE = {
  ok: { cls: 'bg-jadeed-tint text-jadeed-purple ring-jadeed-purple/20', Icon: CheckCircle2 },
  warn: { cls: 'bg-jadeed-yellow-tint text-jadeed-yellow-dark ring-jadeed-yellow/25', Icon: AlertTriangle },
  info: { cls: 'bg-jadeed-gray text-jadeed-muted ring-jadeed-line', Icon: Info },
  err: { cls: 'bg-jadeed-red-tint text-jadeed-red ring-jadeed-red/20', Icon: XCircle },
}

export function MStoreProvider({ children }) {
  const [products, setProducts] = useState(SEED_PRODUCTS)
  const [orders, setOrders] = useState(SEED_ORDERS)
  const [storeOpen, setStoreOpen] = useState(true)
  const [toasts, setToasts] = useState([])

  const toast = useCallback((msg, tone = 'ok') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, msg, tone }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000)
  }, [])

  const setProductStatus = useCallback((id, status) => {
    setProducts((p) => p.map((x) => (x.id === id ? { ...x, status } : x)))
  }, [])
  const setOrderStatus = useCallback((id, status) => {
    setOrders((o) => o.map((x) => (x.id === id ? { ...x, status } : x)))
  }, [])

  const actions = {
    /* انتقالات حالة المنتج — B-10 */
    publish: (id, name) => { setProductStatus(id, 'active'); toast(`نُشر «${name}» ✓ — ظاهر للعملاء الآن`, 'ok') },
    hide: (id, name) => { setProductStatus(id, 'hidden'); toast(`أُخفي «${name}» — لن يظهر في نتائج العملاء`, 'warn') },
    restore: (id, name) => { setProductStatus(id, 'draft'); toast(`استُعيد «${name}» كمسودة — راجعه ثم انشره`, 'info') },
    removeProduct: (id, name) => { setProducts((p) => p.filter((x) => x.id !== id)); toast(`حُذف «${name}» نهائيًا`, 'err') },

    /* انتقالات حالة الطلب — B-16 (دورة الحياة كاملة: جديد←مقبول←تحضير←جاهز←توصيل←تم + مرفوض) */
    accept: (id) => { setOrderStatus(id, 'accepted'); toast(`تم قبول الطلب #${id} — خُصم من المخزون وأُشعر العميل`, 'ok') },
    startPrep: (id) => { setOrderStatus(id, 'preparing'); toast(`بدأ تحضير الطلب #${id}`, 'info') },
    markReady: (id) => { setOrderStatus(id, 'ready'); toast(`الطلب #${id} جاهز — أُشعر المندوب (finishPreparation)`, 'ok') },
    handOver: (id) => { setOrderStatus(id, 'delivering'); toast(`سُلّم #${id} للمندوب — بانتظار توقيع العميل (handToCourier)`, 'info') },
    markDelivered: (id) => { setOrderStatus(id, 'delivered'); toast(`تم تسليم #${id} بتوقيع العميل ✓ — أُقفل الطلب وأُشعر العميل`, 'ok') },
    reject: (id, reason = 'المنتج غير متوفر حاليًا') => {
      setOrders((o) => o.map((x) => (x.id === id ? { ...x, status: 'rejected', reason } : x)))
      toast(`رُفض الطلب #${id} — أُشعر العميل بالسبب (sendNotification)`, 'err')
    },
  }

  return (
    <MStoreCtx.Provider value={{ products, orders, storeOpen, toggleStore: () => setStoreOpen((v) => !v), toasts, toast, ...actions }}>
      {children}
    </MStoreCtx.Provider>
  )
}

/* مضيف التنبيهات — يُركّب داخل شاشة الهاتف */
export function ToastHost() {
  const { toasts } = useMStore()
  return (
    <div className="pointer-events-none absolute inset-x-3 bottom-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((t) => {
          const tone = TONE[t.tone] || TONE.ok
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className={`flex items-start gap-2 rounded-2xl px-3.5 py-2.5 shadow-card ring-1 backdrop-blur ${tone.cls}`}
              style={{ background: undefined }}
            >
              <tone.Icon size={16} className="mt-0.5 shrink-0" />
              <p className="text-[11px] font-bold leading-5">{t.msg}</p>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
