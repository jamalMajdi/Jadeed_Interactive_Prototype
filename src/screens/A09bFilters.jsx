import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Star, Check } from 'lucide-react'
import { Sheet } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'

const SORTS = [
  { id: 'near', label: 'الأقرب أولًا', sub: 'حسب بُعد المتجر من موقعك' },
  { id: 'cheap', label: 'الأرخص أولًا', sub: 'حسب سعر المنتج الأدنى' },
  { id: 'rating', label: 'الأعلى تقييمًا', sub: 'حسب متوسط تقييم العملاء' },
]
const RATINGS = ['الكل', '3+ ★', '4+ ★']

/* خلفية خافتة تمثل الرئيسية خلف اللوحة */
function Backdrop() {
  return (
    <div className="pointer-events-none flex h-full flex-col opacity-50">
      <div className="h-28 bg-gradient-to-b from-jadeed-purple to-jadeed-purple-light" />
      <div className="grow space-y-3 bg-jadeed-bg p-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl border border-jadeed-line bg-white p-3 shadow-soft">
            <div className="h-14 w-14 rounded-xl bg-jadeed-gray" />
            <div className="grow space-y-2">
              <div className="h-2.5 w-1/2 rounded-full bg-jadeed-gray" />
              <div className="h-2 w-1/3 rounded-full bg-jadeed-gray/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function A09b() {
  const { go } = useNav()
  const { toast } = useMStore()
  const [sort, setSort] = useState('near')
  const [rate, setRate] = useState('4+ ★')
  const [dist, setDist] = useState(3)

  return (
    <div className="relative h-full bg-jadeed-bg">
      <Backdrop />

      <Sheet onClose={() => go('a06')}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold">التصفية والترتيب</h2>
          <button onClick={() => go('a06')} className="rounded-full bg-jadeed-bg p-1.5 text-jadeed-muted transition hover:text-jadeed-black">
            <X size={15} strokeWidth={2.4} />
          </button>
        </div>

        {/* الترتيب */}
        <p className="mb-2 mt-5 text-[11px] font-extrabold text-jadeed-muted">الترتيب حسب</p>
        <div className="grid grid-cols-1 gap-2.5">
          {SORTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSort(s.id)}
              className={`flex items-center justify-between rounded-2xl border-2 p-3 text-start transition ${sort === s.id ? 'border-jadeed-purple bg-jadeed-tint' : 'border-jadeed-line bg-white hover:border-[#D8C8F5]'}`}
            >
              <span>
                <span className={`block text-xs font-extrabold ${sort === s.id ? 'text-jadeed-purple' : ''}`}>{s.label}</span>
                <span className="mt-0.5 block text-[10px] leading-4 text-jadeed-muted">{s.sub}</span>
              </span>
              {sort === s.id && <Check size={16} className="shrink-0 text-jadeed-purple" strokeWidth={3} />}
            </button>
          ))}
        </div>

        {/* التقييم */}
        <p className="mb-2 mt-5 text-[11px] font-extrabold text-jadeed-muted">الحد الأدنى للتقييم</p>
        <div className="flex gap-2">
          {RATINGS.map((r) => (
            <button
              key={r}
              onClick={() => setRate(r)}
              className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold transition ${rate === r ? 'bg-jadeed-yellow text-white shadow-soft' : 'border border-jadeed-line bg-white text-jadeed-muted'}`}
            >
              {r !== 'الكل' && <Star size={11} fill="currentColor" strokeWidth={0} />}
              {r}
            </button>
          ))}
        </div>

        {/* المسافة */}
        <div className="mb-1 mt-5 flex items-center justify-between">
          <p className="text-[11px] font-extrabold text-jadeed-muted">نطاق المسافة</p>
          <p className="text-[11px] font-extrabold text-jadeed-purple">حتى {dist} كم</p>
        </div>
        <input
          type="range"
          min={1}
          max={5}
          value={dist}
          onChange={(e) => setDist(+e.target.value)}
          className="w-full"
          dir="ltr"
        />

        {/* أزرار */}
        <div className="mt-6 flex gap-2.5">
          <button
            onClick={() => { setSort('near'); setRate('الكل'); setDist(5); toast('مُسحت كل حدود التصفية', 'info'); go('a06') }}
            className="w-1/3 rounded-2xl border border-jadeed-line py-3.5 text-xs font-extrabold text-jadeed-muted transition hover:bg-jadeed-bg"
          >
            مسح الحدود
          </button>
          <button
            onClick={() => { toast(`طُبّقت التصفية: ${SORTS.find((s) => s.id === sort).label} · تقييم ${rate} · حتى ${dist} كم`, 'ok'); go('a06') }}
            className="flex grow items-center justify-center gap-1.5 rounded-2xl bg-jadeed-orange py-3.5 text-xs font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light"
          >
            <Check size={15} strokeWidth={2.6} /> تطبيق
          </button>
        </div>
      </Sheet>
    </div>
  )
}
