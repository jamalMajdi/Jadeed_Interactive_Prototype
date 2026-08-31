import { motion } from 'framer-motion'
import { AlertTriangle, Crosshair, MapPin, ChevronDown } from 'lucide-react'
import { StatusBar, GradHeader, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'

const CITIES = ['عدن — كريتر', 'عدن — المنصورة', 'عدن — خور مكسر', 'عدن — الشيخ عثمان']
const DISTRICTS = ['كريتر — القاعدة', 'كريتر — الشعب', 'منصورة — الممدارة', 'خور مكسر — أبيس']

/* خريطة CSS تجريدية بنمط الهوية */
function MapMock({ children }) {
  return (
    <div
      className="relative grow overflow-hidden bg-[#EFEDF4]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(80,2,201,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(80,2,201,.06) 1px, transparent 1px)',
        backgroundSize: '34px 34px',
      }}
    >
      {/* طرق */}
      <div className="absolute inset-x-0 top-[38%] h-3 -rotate-6 rounded-full bg-white shadow-soft" />
      <div className="absolute inset-y-0 right-[30%] w-2.5 rotate-3 rounded-full bg-white shadow-soft" />
      {/* منطقة خضراء؟ لا — بلاطة tint ضمن الهوية */}
      <div className="absolute left-6 top-10 h-24 w-28 rounded-3xl bg-jadeed-tint/70" />
      <div className="absolute bottom-24 left-10 h-16 w-20 rounded-3xl bg-jadeed-gray/70" />
      {children}
    </div>
  )
}

export default function A05({ state = 'gps' }) {
  const { go } = useNav()
  const denied = state === 'denied'

  return (
    <div className="flex h-full flex-col bg-white">
      <GradHeader title="حدد موقعك" sub="نستخدم الموقع لعرض المتاجر الأقرب إليك" onBack={() => go('a04')} />

      <div className="relative z-20 -mt-4 flex grow flex-col rounded-t-3xl bg-white">
        {denied ? (
          <div className="no-scrollbar grow overflow-y-auto px-5 pb-6 pt-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-start gap-2.5 rounded-2xl border border-jadeed-yellow/30 bg-jadeed-yellow-tint p-3.5 text-[11px] leading-5 text-jadeed-yellow-dark"
            >
              <AlertTriangle size={17} className="mt-0.5 shrink-0" />
              <span>
                <b>تم رفض إذن الموقع.</b> يمكنك إدخال موقعك يدويًا، أو تفعيل الإذن من إعدادات الجهاز ثم إعادة المحاولة (A-05).
              </span>
            </motion.div>

            <div className="space-y-4">
              <div>
                <span className="mb-1.5 block text-xs font-bold">المدينة / المديرية</span>
                <div className="relative">
                  <select className="w-full appearance-none rounded-2xl border border-jadeed-line bg-jadeed-bg px-4 py-3.5 text-sm font-bold outline-none focus:border-jadeed-purple">
                    {CITIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-jadeed-ghost" />
                </div>
              </div>
              <div>
                <span className="mb-1.5 block text-xs font-bold">الحي</span>
                <div className="relative">
                  <select className="w-full appearance-none rounded-2xl border border-jadeed-line bg-jadeed-bg px-4 py-3.5 text-sm font-bold outline-none focus:border-jadeed-purple">
                    {DISTRICTS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-jadeed-ghost" />
                </div>
              </div>
              <div>
                <span className="mb-1.5 block text-xs font-bold">وصف الموقع (اختياري)</span>
                <input placeholder="مثال: قرب جولة القاعدة" className="w-full rounded-2xl border border-jadeed-line bg-jadeed-bg px-4 py-3.5 text-sm outline-none focus:border-jadeed-purple focus:bg-white" />
              </div>
            </div>

            <button
              onClick={() => go('a06')}
              className="mt-6 w-full rounded-2xl bg-jadeed-orange py-3.5 text-sm font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light active:scale-[.98]"
            >
              حفظ الموقع ومتابعة
            </button>
          </div>
        ) : (
          <>
            <MapMock>
              {/* مؤشر الموقع */}
              <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
                <motion.span
                  animate={{ scale: [1, 2], opacity: [0.45, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
                  className="absolute -inset-5 rounded-full bg-jadeed-purple/30"
                />
                <motion.div
                  initial={{ y: -16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="relative flex h-11 w-11 items-center justify-center rounded-full bg-jadeed-purple text-white shadow-pop ring-4 ring-white"
                >
                  <MapPin size={20} fill="currentColor" strokeWidth={0} />
                </motion.div>
              </div>
              <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-extrabold text-jadeed-purple shadow-soft">
                <Crosshair size={12} /> دقة التحديد ±٢٠م
              </span>
            </MapMock>

            <motion.div
              variants={fadeUp} initial="hidden" animate="show"
              className="relative z-10 -mt-2 rounded-t-3xl border-t border-jadeed-line bg-white p-5 shadow-card"
            >
              <p className="text-xs font-bold">موقعك التقريبي</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-jadeed-muted">
                <MapPin size={14} className="text-jadeed-purple" /> عدن — كريتر، شارع الجامعة
              </p>
              <div className="mt-4 space-y-2.5">
                <button
                  onClick={() => go('a06')}
                  className="w-full rounded-2xl bg-jadeed-orange py-3.5 text-sm font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light active:scale-[.98]"
                >
                  تأكيد الموقع
                </button>
                <button
                  onClick={() => go('a05d')}
                  className="w-full rounded-2xl border border-jadeed-line bg-white py-3.5 text-sm font-extrabold text-jadeed-purple transition hover:bg-jadeed-tint"
                >
                  إدخال الموقع يدويًا
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
