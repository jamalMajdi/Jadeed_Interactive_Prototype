import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Info } from 'lucide-react'
import { GradHeader, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'

const CITIES = ['عدن — كريتر', 'عدن — المنصورة', 'عدن — خور مكسر', 'عدن — الشيخ عثمان']
const DISTRICTS = ['كريتر — القاعدة', 'كريتر — الشعب', 'منصورة — الممدارة', 'خور مكسر — أبيس']

function Field({ label, children, i }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={i % 4}>
      <span className="mb-1 block text-[11px] font-bold">{label}</span>
      {children}
    </motion.div>
  )
}

const inp =
  'w-full rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 text-xs outline-none transition focus:border-jadeed-purple focus:bg-white'

/* B-02 — نموذج تسجيل التاجر: الحقول التسعة المدمجة (M1 + UC-02 → DD-11)
   بوابة الاكتمال وفق ACT_requestToCreateStore: «make the submit button on» بعد إكمال
   الحقول الصحيحة + «correcting and give hints while entering» (تلميحات أثناء الإدخال) */
export default function B02() {
  const { go } = useNav()
  const [f, setF] = useState({ name: '', store: '', email: '', phone: '', pass: '' })
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }))
  const filled = [f.name, f.store, f.email, f.phone, f.pass].filter((v) => v.trim() !== '').length
  const passBad = f.pass.length > 0 && f.pass.length < 8
  const ready = filled === 5 && !passBad

  return (
    <div className="flex h-full flex-col bg-white">
      <GradHeader title="سجّل كتاجر" sub="٩ حقول موحّدة — من بياناتك وبيانات متجرك" onBack={() => go('b01')} />

      <div className="no-scrollbar relative z-20 -mt-4 grow overflow-y-auto rounded-t-3xl bg-white px-5 pb-6 pt-5">
        <div className="mb-4 flex items-start gap-2 rounded-xl bg-jadeed-tint px-3 py-2 text-[10px] leading-4 text-jadeed-purple">
          <Info size={13} className="mt-0.5 shrink-0" />
          نموذج موحّد يدمج حقول M1 وUC-02 في خطوة واحدة — قرار التصميم DD-11
        </div>

        <div className="space-y-3.5">
          <Field label="الاسم الكامل *" i={0}><input value={f.name} onChange={set('name')} className={inp} placeholder="مثال: علي ناصر سالم" /></Field>
          <Field label="اسم المتجر *" i={1}><input value={f.store} onChange={set('store')} className={inp} placeholder="مثال: بقالة النور" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="المدينة / المديرية *" i={2}>
              <div className="relative">
                <select className={inp + ' appearance-none font-bold'}>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
                <ChevronDown size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-jadeed-ghost" />
              </div>
            </Field>
            <Field label="الحي *" i={3}>
              <div className="relative">
                <select className={inp + ' appearance-none font-bold'}>{DISTRICTS.map((c) => <option key={c}>{c}</option>)}</select>
                <ChevronDown size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-jadeed-ghost" />
              </div>
            </Field>
          </div>
          <Field label="البريد الإلكتروني *" i={0}><input dir="ltr" value={f.email} onChange={set('email')} className={inp + ' text-left'} placeholder="store@example.com" /></Field>
          <Field label="رقم الجوال *" i={1}>
            <div dir="ltr" className="flex items-center gap-2 rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 transition focus-within:border-jadeed-purple focus-within:bg-white">
              <span className="text-[11px] font-bold text-jadeed-muted">+967</span>
              <input value={f.phone} onChange={set('phone')} className="w-full bg-transparent text-left text-xs outline-none" placeholder="7xx xxx xxx" />
            </div>
          </Field>
          <Field label="كلمة المرور *" i={2}>
            <input type="password" value={f.pass} onChange={set('pass')} className={inp + (passBad ? ' border-jadeed-red/50' : '')} placeholder="٨ أحرف فأكثر" />
            {passBad && <span className="mt-1 block text-[10px] font-bold text-jadeed-red">كلمة المرور ٨ أحرف على الأقل</span>}
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="رقم السجل التجاري" i={3}><input className={inp} placeholder="اختياري" /></Field>
            <Field label="رقم الهوية الوطنية" i={0}><input className={inp} placeholder="اختياري" /></Field>
          </div>
        </div>

        {/* تلميح الاكتمال — hints while entering (ACT_requestToCreateStore) */}
        {!ready && (
          <div className="mt-4">
            <div className="h-1.5 overflow-hidden rounded-full bg-jadeed-gray">
              <motion.div animate={{ width: `${(filled / 5) * 100}%` }} transition={{ type: 'spring', stiffness: 160, damping: 22 }} className="h-full rounded-full bg-jadeed-purple" />
            </div>
            <p className="mt-1.5 text-[10px] font-bold text-jadeed-muted">
              أكمل الحقول الإجبارية الخمسة للمتابعة — تبقّى {5 - filled} {passBad ? '· كلمة المرور قصيرة' : ''}
            </p>
          </div>
        )}

        <motion.button
          variants={fadeUp} initial="hidden" animate="show" custom={2}
          disabled={!ready}
          onClick={() => go('b04')}
          className={`mt-5 w-full rounded-2xl py-3.5 text-sm font-extrabold transition active:scale-[.98] ${ready ? 'bg-jadeed-orange text-white shadow-pop hover:bg-jadeed-orange-light' : 'bg-jadeed-gray text-jadeed-ghost'}`}
        >
          {ready ? 'متابعة — رفع المستندات' : `أكمل الحقول أولًا (${filled}/٥)`}
        </motion.button>
      </div>
    </div>
  )
}
