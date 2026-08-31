import { motion } from 'framer-motion'
import { ChevronRight, MapPin, Pencil, Clock, XCircle, MessageSquareText } from 'lucide-react'
import { StatusBar, ProductIcon, tileCls, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { user, DELIVERY_FEE, fmt } from '../data/db.js'

const SUMMARY = [
  { id: 'p1', name: 'طماطم بلدي طازجة ×٢', price: 1800, icon: 'Carrot' },
  { id: 'p3', name: 'حليب طازج ١ لتر ×٣', price: 3300, icon: 'Milk' },
  { id: 'p4', name: 'بيض بلدي — طبق ٣٠ ×١', price: 4200, icon: 'Egg' },
]
const TOTAL = SUMMARY.reduce((a, s) => a + s.price, 0) + DELIVERY_FEE

export default function A11({ state = 'default' }) {
  const { go } = useNav()
  const bad = state === 'stockerr'

  return (
    <div className="flex h-full flex-col bg-jadeed-bg">
      <div className="relative z-10 border-b border-jadeed-line bg-white px-5 pb-4 pt-3">
        <StatusBar />
        <div className="mt-2 flex items-center gap-3">
          <button onClick={() => go('a10')} className="rounded-full bg-jadeed-bg p-2 text-jadeed-black">
            <ChevronRight size={18} />
          </button>
          <h1 className="text-lg font-extrabold">إتمام الطلب</h1>
          <span className="rounded-full bg-jadeed-tint px-2.5 py-1 text-[11px] font-extrabold text-jadeed-purple">بقالة النور</span>
        </div>
      </div>

      <div className="no-scrollbar grow overflow-y-auto px-4 pb-4 pt-4">
        {bad && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-start justify-between gap-2 rounded-2xl border border-jadeed-red/25 bg-jadeed-red-tint p-3.5 text-[11px] leading-5 text-jadeed-red"
          >
            <div className="flex items-start gap-2">
              <XCircle size={16} className="mt-0.5 shrink-0" />
              <span>
                <b>تعذر إتمام الطلب:</b> «حليب طازج ١ لتر» الكمية المتاحة ٢ فقط. عدّل الكمية أو أزل المنتج للمتابعة.
              </span>
            </div>
            <button onClick={() => go('a10')} className="shrink-0 rounded-lg bg-white px-2 py-1 text-[10px] font-extrabold text-jadeed-red">
              تعديل السلة
            </button>
          </motion.div>
        )}

        <div className="space-y-3">
          {/* العنوان */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex items-center gap-3 rounded-2xl border border-jadeed-line bg-white p-3.5 shadow-soft">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-jadeed-tint text-jadeed-purple">
              <MapPin size={20} />
            </span>
            <div className="min-w-0 grow">
              <p className="text-xs font-extrabold">التوصيل إلى</p>
              <p className="truncate text-[11px] text-jadeed-muted">{user.city} · {user.street}</p>
            </div>
            <button onClick={() => go('a05')} className="flex shrink-0 items-center gap-1 rounded-lg bg-jadeed-bg px-2.5 py-1.5 text-[10px] font-extrabold text-jadeed-purple transition hover:shadow-soft">
              <Pencil size={11} /> تعديل
            </button>
          </motion.div>

          {/* وقت التوصيل */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="rounded-2xl border border-jadeed-line bg-white p-3.5 shadow-soft">
            <p className="flex items-center gap-1.5 text-xs font-extrabold"><Clock size={14} className="text-jadeed-purple" /> وقت التوصيل</p>
            <div className="mt-2.5 flex gap-2">
              <span className="flex-1 rounded-xl bg-jadeed-purple py-2.5 text-center text-[11px] font-extrabold text-white shadow-soft">في أقرب وقت (~٢٥ د)</span>
              <span className="flex-1 rounded-xl border border-jadeed-line bg-white py-2.5 text-center text-[11px] font-bold text-jadeed-muted">جدولة لاحقًا</span>
            </div>
          </motion.div>

          {/* ملاحظة */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="rounded-2xl border border-jadeed-line bg-white p-3.5 shadow-soft">
            <p className="flex items-center gap-1.5 text-xs font-extrabold"><MessageSquareText size={14} className="text-jadeed-purple" /> ملاحظة للمتجر (اختياري)</p>
            <input placeholder="مثال: الطماطم تفضل ناضجة متوسطة" className="mt-2.5 w-full rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 text-xs outline-none transition focus:border-jadeed-purple focus:bg-white" />
          </motion.div>

          {/* الملخص */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="rounded-2xl border border-jadeed-line bg-white p-4 shadow-soft">
            <p className="mb-3 text-xs font-extrabold">ملخص الطلب</p>
            <div className="space-y-2.5">
              {SUMMARY.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2.5">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tileCls(i)}`}>
                    <ProductIcon name={s.icon} size={17} />
                  </div>
                  <p className="grow truncate text-[11px] font-bold">{s.name}</p>
                  <p className="text-[11px] font-bold text-jadeed-muted">{fmt(s.price)}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1.5 border-t border-dashed border-jadeed-line pt-3 text-xs text-jadeed-muted">
              <div className="flex justify-between"><span>رسوم التوصيل</span><span className="font-bold text-jadeed-black">{fmt(DELIVERY_FEE)}</span></div>
              <div className="flex justify-between"><span>طريقة الدفع</span><span className="font-bold text-jadeed-black">الدفع عند الاستلام — كاش</span></div>
              <div className="flex justify-between pt-1"><span className="font-extrabold text-jadeed-black">الإجمالي</span><span className="text-base font-extrabold text-jadeed-purple">{fmt(TOTAL)}</span></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* شريط الإرسال */}
      <div className="z-10 border-t border-jadeed-line bg-white p-4 shadow-card">
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={bad}
          onClick={() => go('a12')}
          className={`w-full rounded-2xl py-3.5 text-sm font-extrabold transition ${bad ? 'bg-jadeed-gray text-jadeed-ghost' : 'bg-jadeed-orange text-white shadow-pop hover:bg-jadeed-orange-light'}`}
        >
          {bad ? 'لا يمكن إرسال الطلب الآن' : `إرسال الطلب · ${fmt(TOTAL)}`}
        </motion.button>
      </div>
    </div>
  )
}
