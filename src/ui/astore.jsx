import { createContext, useCallback, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { SEED_CATEGORIES, SEED_STORE_REQ, SEED_USERS, SEED_VERIFY } from '../data/admin.js'

/* مخزن لوحة الإدارة: توثيق + متاجر + مستخدمون + فئات (VFinal) + متاجر معتمدة تظهر للعميل */
const AStoreCtx = createContext(null)
export const useAStore = () => useContext(AStoreCtx)

const TONE = {
  ok: { cls: 'bg-jadeed-tint text-jadeed-purple ring-jadeed-purple/25', Icon: CheckCircle2 },
  warn: { cls: 'bg-jadeed-yellow-tint text-jadeed-yellow-dark ring-jadeed-yellow/30', Icon: AlertTriangle },
  info: { cls: 'bg-jadeed-gray text-jadeed-muted ring-jadeed-line', Icon: Info },
  err: { cls: 'bg-jadeed-red-tint text-jadeed-red ring-jadeed-red/25', Icon: XCircle },
}

export function AStoreProvider({ children }) {
  const [verify, setVerify] = useState(SEED_VERIFY)
  const [storeReq, setStoreReq] = useState(SEED_STORE_REQ)
  const [users, setUsers] = useState(SEED_USERS)
  const [cats, setCats] = useState(SEED_CATEGORIES)
  const [approvedStores, setApprovedStores] = useState([])
  const [toasts, setToasts] = useState([])

  const toast = useCallback((msg, tone = 'ok') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, msg, tone }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  const actions = {
    /* طلبات التوثيق — C-04: الموافقة تُظهر التاجر فورًا في تطبيق العميل (A-06) */
    approveVerify: (id, store) => {
      setVerify((v) => v.filter((r) => r.id !== id))
      setUsers((u) => [...u, { id: 'm' + id, name: store, type: 'تاجر', phone: '—', orders: 0, status: 'active' }])
      setApprovedStores((s) => [...s, { id: 'as-' + id, name: store, cat: 'موثّق حديثًا · من لوحة الإدارة', rating: 4.5, dist: 'قريب منك', eta: '~٢٠ د', open: true }])
      toast(`وُثّق «${store}» ✓ — ظهر متجره فورًا في تطبيق العميل`, 'ok')
    },
    rejectVerify: (id, store) => { setVerify((v) => v.filter((r) => r.id !== id)); toast(`رُفض طلب «${store}» — أُشعر التاجر بالسبب`, 'err') },

    /* طلبات المتاجر — C-06: القبول ينشر المتجر للعملاء فورًا · الرفض بسبب موثق (حارس State-Store_Creation_Request) */
    approveStore: (id, store) => {
      setStoreReq((s) => s.filter((r) => r.id !== id))
      setApprovedStores((s) => [...s, { id: 'as-' + id, name: store, cat: 'مُعتمد حديثًا · من لوحة الإدارة', rating: 4.5, dist: 'قريب منك', eta: '~٢٥ د', open: true }])
      toast(`قُبل متجر «${store}» ✓ — نُشر للعملاء في «المتاجر القريبة»`, 'ok')
    },
    rejectStore: (id, store, reason = 'لا تستوفي معايير النشر') => {
      setStoreReq((s) => s.filter((r) => r.id !== id))
      toast(`رُفض طلب متجر «${store}» — السبب: ${reason} (متاح لإعادة التقديم)`, 'err')
    },

    /* المستخدمون — C-07/C-08: الحظر بسبب إلزامي ينعكس على شاشة العميل A-17 */
    blockUser: (id, name, reason) => { setUsers((u) => u.map((x) => (x.id === id ? { ...x, status: 'blocked', reason } : x))); toast(`حُظر «${name}» — السبب: ${reason}`, 'err') },
    unblockUser: (id, name) => { setUsers((u) => u.map((x) => (x.id === id ? { ...x, status: 'active', reason: undefined } : x))); toast(`رُفع الحظر عن «${name}» ✓ — أُشعر عبر إشعار`, 'ok') },

    /* الفئات — C-18 ★: تنعكس فورًا على قائمة تصنيف التاجر (B-11) وفلاتر العميل (A-07) */
    addCat: (name) => setCats((c) => [...c, { id: 'c' + Date.now(), name, products: 0 }]),
    delCat: (id) => setCats((c) => c.filter((x) => x.id !== id)),
  }

  return <AStoreCtx.Provider value={{ verify, storeReq, users, cats, approvedStores, toasts, toast, ...actions }}>{children}</AStoreCtx.Provider>
}

/* مضيف تنبيهات الإدارة — أعلى يسار نافذة سطح المكتب */
export function AToastHost() {
  const { toasts } = useAStore()
  return (
    <div className="pointer-events-none absolute left-4 top-4 z-50 w-80 space-y-2">
      <AnimatePresence>
        {toasts.map((t) => {
          const tone = TONE[t.tone] || TONE.ok
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: -24, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -16, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className={`flex items-start gap-2.5 rounded-2xl px-4 py-3 shadow-card ring-1 backdrop-blur ${tone.cls}`}
            >
              <tone.Icon size={17} className="mt-0.5 shrink-0" />
              <p className="text-xs font-bold leading-5">{t.msg}</p>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
