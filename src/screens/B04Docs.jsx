import { useState } from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, Check, CloudUpload, ImagePlus } from 'lucide-react'
import { GradHeader, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'

const DOCS = [
  { id: 'idfront', label: 'الهوية الشخصية — الوجه الأمامي', file: 'id_front.jpg' },
  { id: 'idback', label: 'الهوية الشخصية — الوجه الخلفي', file: 'id_back.jpg' },
  { id: 'store', label: 'صورة واجهة المتجر', file: 'store_front.jpg' },
]

/* B-04 — رفع المستندات: خانات منفصلة لكل وجه + واجهة المتجر (V3) */
export default function B04() {
  const { go } = useNav()
  const [done, setDone] = useState({ idfront: false, idback: false, store: false })
  const count = Object.values(done).filter(Boolean).length

  return (
    <div className="flex h-full flex-col bg-white">
      <GradHeader title="ارفع مستنداتك" sub="ثلاث صور مطلوبة لتفعيل حساب التاجر" onBack={() => go('b02')} />

      <div className="no-scrollbar relative z-20 -mt-4 grow overflow-y-auto rounded-t-3xl bg-white px-5 pb-6 pt-5">
        {/* شريط التقدم */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-1.5 grow overflow-hidden rounded-full bg-jadeed-gray">
            <motion.div
              animate={{ width: `${(count / 3) * 100}%` }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              className="h-full rounded-full bg-jadeed-purple"
            />
          </div>
          <span className="text-[11px] font-extrabold text-jadeed-purple">{count}/٣</span>
        </div>

        <div className="space-y-3">
          {DOCS.map((d, i) => {
            const ok = done[d.id]
            return (
              <motion.button
                key={d.id}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={i}
                onClick={() => setDone((p) => ({ ...p, [d.id]: !p[d.id] }))}
                className={`flex w-full items-center gap-3 rounded-2xl border-2 border-dashed p-3.5 text-start transition ${ok ? 'border-jadeed-purple/50 bg-jadeed-tint' : 'border-jadeed-line bg-jadeed-bg hover:border-jadeed-purple/40'}`}
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition ${ok ? 'bg-jadeed-purple text-white' : 'bg-white text-jadeed-ghost shadow-soft'}`}>
                  {ok ? <BadgeCheck size={22} /> : <ImagePlus size={20} />}
                </span>
                <span className="grow">
                  <span className="block text-xs font-extrabold">{d.label}</span>
                  <span className="mt-0.5 flex items-center gap-1 text-[10px] text-jadeed-muted">
                    {ok ? <><Check size={11} className="text-jadeed-purple" /> {d.file} — جاهزة للرفع</> : 'اضغط لاختيار الصورة (JPG/PNG)'}
                  </span>
                </span>
                <CloudUpload size={18} className={`shrink-0 ${ok ? 'text-jadeed-purple' : 'text-jadeed-ghost'}`} />
              </motion.button>
            )
          })}
        </div>

        <p className="mt-4 rounded-xl bg-jadeed-gray/60 px-3 py-2 text-[10px] leading-4 text-jadeed-muted">
          حالات فشل الرفع (V3): ضعف الشبكة → تُحفظ الصورة محليًا ويُعاد رفعها تلقائيًا عند عودة الاتصال · حجم أكبر من ٥MB → رسالة فورية
        </p>

        <button
          disabled={count < 3}
          onClick={() => go('b05')}
          className={`mt-5 w-full rounded-2xl py-3.5 text-sm font-extrabold transition active:scale-[.98] ${count === 3 ? 'bg-jadeed-orange text-white shadow-pop hover:bg-jadeed-orange-light' : 'bg-jadeed-gray text-jadeed-ghost'}`}
        >
          {count === 3 ? 'إرسال الطلب للمراجعة' : `أكمل رفع الصور (${3 - count} متبقية)`}
        </button>
      </div>
    </div>
  )
}
