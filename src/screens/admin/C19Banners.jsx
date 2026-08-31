import { motion } from 'framer-motion'
import { Eye, EyeOff, Megaphone, Plus } from 'lucide-react'
import { useState } from 'react'
import { APage, ABadge } from '../../ui/ashell.jsx'
import { useAStore } from '../../ui/astore.jsx'
import { SEED_BANNERS } from '../../data/admin.js'

const TONES = {
  orange: 'from-jadeed-orange to-jadeed-orange-light',
  purple: 'from-jadeed-purple to-jadeed-purple-light',
  yellow: 'from-jadeed-yellow to-[#ffb345]',
}

/* C-19 ★ — إدارة العروض والبنرات (طلب عميل — خارج التحليل) */
export default function C19() {
  const { toast } = useAStore()
  const [banners, setBanners] = useState(SEED_BANNERS)

  const toggle = (b) => {
    setBanners((bs) => bs.map((x) => (x.id === b.id ? { ...x, active: !x.active } : x)))
    toast(b.active ? `أُوقف عرض «${b.title}» — اختفى من تطبيق العميل` : `فعّل عرض «${b.title}» ✓ — يظهر الآن في الرئيسية (A-06)`, b.active ? 'warn' : 'ok')
  }

  return (
    <APage
      title="العروض والبنرات"
      sub="البانرات الترويجية الظاهرة في الرئيسية وشاشات العميل"
      actions={
        <>
          <ABadge tone="orange">★ طلب عميل — VFinal</ABadge>
          <button
            onClick={() => toast('النموذج التجريبي يعرض ٣ بانرات — إنشاء بانر كامل متاح في النسخة التنفيذية', 'info')}
            className="flex items-center gap-1.5 rounded-xl bg-jadeed-orange px-3.5 py-2 text-[11px] font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light"
          >
            <Plus size={14} strokeWidth={2.6} /> بانر جديد
          </button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {banners.map((b) => (
          <motion.div key={b.id} layout className={`overflow-hidden rounded-3xl shadow-soft ring-1 ${b.active ? 'ring-black/5' : 'ring-jadeed-line opacity-75'}`}>
            <div className={`relative bg-gradient-to-br p-5 text-white ${TONES[b.tone]} ${b.active ? '' : 'grayscale'}`}>
              <Megaphone size={20} className="opacity-80" />
              <p className="mt-2.5 text-base font-extrabold leading-6">{b.title}</p>
              <p className="mt-1 text-[11px] text-white/80">{b.sub}</p>
              {!b.active && (
                <span className="absolute left-4 top-4 rounded-full bg-jadeed-black/60 px-2.5 py-1 text-[9px] font-extrabold">موقوف</span>
              )}
            </div>
            <div className="flex items-center justify-between bg-white p-3.5">
              <p className="text-[10px] font-bold text-jadeed-muted">
                {b.active ? `${b.views.toLocaleString('en-US')} مشاهدة` : 'لم يُفعّل بعد'}
              </p>
              <button
                onClick={() => toggle(b)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[10px] font-extrabold transition ${b.active ? 'border border-jadeed-line text-jadeed-muted hover:text-jadeed-yellow-dark' : 'bg-jadeed-purple text-white hover:bg-jadeed-purple-light'}`}
              >
                {b.active ? <><EyeOff size={12} /> إيقاف</> : <><Eye size={12} /> تفعيل</>}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-4 rounded-xl bg-jadeed-orange-tint px-3.5 py-2.5 text-[11px] leading-5 text-jadeed-orange">
        ★ C-18 وC-19 أُضيفا بناءً على طلب العميل الصريح (خارج ملفات التحليل) وموثقان بـ DD-09 في حزمة V3
      </p>
    </APage>
  )
}
