import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ShoppingCart, Minus, Plus, SearchX, Store as StoreIcon, AlertTriangle, PackageX, BellPlus } from 'lucide-react'
import { StatusBar, RatingChip, ProductIcon, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'
import { useCart } from '../ui/cstore.jsx'
import { fmt } from '../data/db.js'

const P = { id: 'p1', name: 'طماطم بلدي طازجة', store: 'بقالة النور', price: 900, unit: 'كيلو', rating: 4.6, icon: 'Carrot' }

/* حالة 404 — A-08n */
function NotFound() {
  const { go } = useNav()
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-white px-8 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="flex h-20 w-20 items-center justify-center rounded-3xl bg-jadeed-red-tint text-jadeed-red"
      >
        <SearchX size={38} strokeWidth={1.6} />
      </motion.div>
      <p className="text-5xl font-extrabold tracking-widest text-jadeed-gray" dir="ltr">404</p>
      <h3 className="text-base font-extrabold">هذا المنتج غير موجود</h3>
      <p className="text-xs leading-6 text-jadeed-muted">ربما حُذف المنتج أو أخفاه المتجر — تصفح بدائل قريبة منك (A-08n)</p>
      <button
        onClick={() => go('a06')}
        className="mt-2 rounded-2xl bg-jadeed-purple px-6 py-3 text-xs font-extrabold text-white shadow-pop transition hover:bg-jadeed-purple-light"
      >
        العودة إلى الرئيسية
      </button>
    </div>
  )
}

export default function A08({ state = 'default' }) {
  const { go } = useNav()
  const { toast } = useMStore()
  const { add } = useCart()
  const [qty, setQty] = useState(2)
  const oos = state === 'oos'
  const total = P.price * qty

  if (state === '404') return <NotFound />

  return (
    <div className="flex h-full flex-col bg-jadeed-bg">
      <div className="no-scrollbar grow overflow-y-auto">
        {/* الواجهة البصرية للمنتج */}
        <div className="relative z-10 bg-gradient-to-br from-[#F1E9FF] to-[#E4E2EA] px-5 pb-14 pt-3">
          <StatusBar />
          <button onClick={() => go('a07')} className="mt-2 rounded-full bg-white p-2 shadow-soft transition hover:shadow-pop">
            <ChevronRight size={18} className="text-jadeed-black" />
          </button>
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 240, damping: 16 }}
            className="mt-4 flex justify-center"
          >
            <ProductIcon name={P.icon} size={96} className={oos ? 'text-jadeed-ghost' : 'text-jadeed-purple'} />
          </motion.div>
          <div className="mt-4 flex justify-center gap-1.5">
            <span className="h-1.5 w-5 rounded-full bg-jadeed-purple" />
            <span className="h-1.5 w-1.5 rounded-full bg-jadeed-purple/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-jadeed-purple/30" />
          </div>
        </div>

        {/* كارت التفاصيل */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative z-20 -mt-6 rounded-t-3xl bg-white px-5 pt-5">
          {oos && (
            <div className="mb-4 rounded-2xl border border-jadeed-yellow/30 bg-jadeed-yellow-tint p-3 text-[11px] leading-5 text-jadeed-yellow-dark">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                <span><b>نفدت الكمية من هذا المنتج.</b> الإضافة للسلة معطّلة حتى عودته للمخزون.</span>
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-2 rounded-xl bg-white/80 px-3 py-2">
                <span className="text-[10px] font-bold text-jadeed-muted">سننبّهك فور إعادة المتجر توفيره</span>
                <button
                  onClick={() => toast('فعّلنا التنبيه — سيصلك إشعار عند توفر المنتج مجددًا ✓', 'ok')}
                  className="flex shrink-0 items-center gap-1 rounded-lg bg-jadeed-purple px-2.5 py-1.5 text-[10px] font-extrabold text-white transition hover:bg-jadeed-purple-light"
                >
                  <BellPlus size={12} /> تنبيهي عند التوفر
                </button>
              </div>
            </div>
          )}

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-lg font-extrabold leading-7">{P.name}</h1>
              <button onClick={() => go('a07')} className="mt-1 flex items-center gap-1 text-xs font-bold text-jadeed-purple">
                <StoreIcon size={13} /> {P.store}
              </button>
            </div>
            <RatingChip value={P.rating} />
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-xl font-extrabold text-jadeed-purple">{fmt(P.price)}</p>
              <p className="text-[11px] text-jadeed-muted">للـ{P.unit} · شامل ضريبة المتجر</p>
            </div>
            {/* محدد الكمية */}
            <div className="flex items-center gap-3 rounded-full border border-jadeed-line bg-jadeed-bg px-2 py-1.5">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-jadeed-purple shadow-soft transition hover:text-jadeed-orange"
              >
                <Minus size={14} strokeWidth={2.4} />
              </button>
              <span className="w-5 text-center text-sm font-extrabold">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(9, q + 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-jadeed-purple shadow-soft transition hover:text-jadeed-orange"
              >
                <Plus size={14} strokeWidth={2.4} />
              </button>
            </div>
          </div>

          <p className="mt-4 border-t border-jadeed-line pt-4 text-xs leading-6 text-jadeed-muted">
            طماطم بلدي طازجة من مزارع محلية، تُجمع يوميًا صباحًا وتصل إليك في عبوة مهواة تحفظ جودتها حتى باب البيت.
          </p>
        </motion.div>
      </div>

      {/* شريط الإضافة */}
      <div className="z-10 flex items-center gap-3 border-t border-jadeed-line bg-white p-4 shadow-card">
        <div className="min-w-0">
          <p className="text-[10px] text-jadeed-muted">الإجمالي</p>
          <p className="text-sm font-extrabold">{fmt(total)}</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={oos}
          onClick={() => {
            /* ACT_ManageCart: Add product to cart → «display added cart» → مراجعة السلة */
            add(P, qty)
            toast(`أُضيفت «${P.name}» ×${qty} إلى السلة ✓`, 'ok')
            go('a10')
          }}
          className={`flex grow items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold transition ${oos ? 'bg-jadeed-gray text-jadeed-ghost' : 'bg-jadeed-orange text-white shadow-pop hover:bg-jadeed-orange-light'}`}
        >
          {oos ? (
            <>
              <PackageX size={18} /> غير متوفر حاليًا
            </>
          ) : (
            <>
              <ShoppingCart size={18} /> أضف إلى السلة
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}
