import { motion } from 'framer-motion'
import { Camera, ChevronRight } from 'lucide-react'
import { StatusBar, GradHeader, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'

const CITIES = ['عدن — كريتر', 'عدن — المنصورة', 'عدن — خور مكسر', 'عدن — الشيخ عثمان']
const DISTRICTS = ['حي القاعدة', 'حي الشعب', 'حي الميدان', 'حي الجامعة']

export default function A04() {
  const { go } = useNav()
  const { toast } = useMStore()

  return (
    <div className="flex h-full flex-col bg-white">
      <GradHeader title="أكمل بياناتك" sub="خطوة واحدة تفصلك عن متاجر حيّك" onBack={() => go('a03')} />

      <div className="no-scrollbar relative z-20 -mt-4 grow overflow-y-auto rounded-t-3xl bg-white px-5 pb-6 pt-5">
        {/* الصورة الشخصية */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-6 flex justify-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-jadeed-tint text-xl font-extrabold text-jadeed-purple">س</div>
            <button className="absolute -bottom-1 -left-1 rounded-full bg-jadeed-orange p-2 text-white shadow-pop transition hover:bg-jadeed-orange-light">
              <Camera size={14} />
            </button>
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
            <span className="mb-1.5 block text-xs font-bold">الاسم الكامل</span>
            <input defaultValue="سامي عبده" className="w-full rounded-2xl border border-jadeed-line bg-jadeed-bg px-4 py-3.5 text-sm outline-none transition focus:border-jadeed-purple focus:bg-white focus:shadow-pop" />
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}>
            <span className="mb-1.5 block text-xs font-bold">رقم الجوال</span>
            <div dir="ltr" className="flex items-center gap-2 rounded-2xl border border-jadeed-line bg-jadeed-bg px-4 py-3.5 transition focus-within:border-jadeed-purple focus-within:bg-white focus-within:shadow-pop">
              <span className="text-xs font-bold text-jadeed-muted">+967</span>
              <input defaultValue="771 234 567" className="w-full bg-transparent text-left text-sm outline-none" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
            <span className="mb-1.5 block text-xs font-bold">المدينة / المديرية</span>
            <div className="relative">
              <select className="w-full appearance-none rounded-2xl border border-jadeed-line bg-jadeed-bg px-4 py-3.5 text-sm font-bold outline-none transition focus:border-jadeed-purple focus:bg-white">
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <ChevronRight size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 rotate-90 text-jadeed-ghost" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3.5}>
            <span className="mb-1.5 block text-xs font-bold">الحي</span>
            <div className="relative">
              <select className="w-full appearance-none rounded-2xl border border-jadeed-line bg-jadeed-bg px-4 py-3.5 text-sm font-bold outline-none transition focus:border-jadeed-purple focus:bg-white">
                {DISTRICTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <ChevronRight size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 rotate-90 text-jadeed-ghost" />
            </div>
          </motion.div>
        </div>

        <motion.button
          variants={fadeUp} initial="hidden" animate="show" custom={4}
          onClick={() => { toast('تم حفظ بياناتك بنجاح ✓ — حدد موقعك لعرض الأقرب', 'ok'); go('a05') }}
          className="mt-7 w-full rounded-2xl bg-jadeed-orange py-3.5 text-sm font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light active:scale-[.98]"
        >
          إنشاء الحساب
        </motion.button>
      </div>
    </div>
  )
}
