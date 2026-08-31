import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, MapPin, FileText, Bell, Trash2, LogOut, Pencil, Store } from 'lucide-react'
import { StatusBar, Logo, BottomNav, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { user } from '../data/db.js'

export default function A16() {
  const { go } = useNav()
  const [notif, setNotif] = useState(true)

  return (
    <div className="flex h-full flex-col bg-jadeed-bg">
      {/* رأس الحساب */}
      <div className="relative z-10 bg-gradient-to-b from-jadeed-purple to-jadeed-purple-light px-5 pb-14 pt-3 text-white">
        <StatusBar light />
        <div className="mt-2 flex items-center justify-between">
          <Logo size={30} />
          <button onClick={() => go('a04')} className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold transition hover:bg-white/25">
            <Pencil size={12} /> تعديل الملف
          </button>
        </div>
      </div>

      <div className="no-scrollbar relative z-20 -mt-10 grow overflow-y-auto px-4 pb-4">
        {/* كارت الهوية */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="rounded-3xl border border-jadeed-line bg-white p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-jadeed-tint text-lg font-extrabold text-jadeed-purple">س</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold">{user.name}</p>
              <p dir="ltr" className="text-right text-[11px] text-jadeed-muted">{user.phone}</p>
              <p dir="ltr" className="text-right text-[11px] text-jadeed-muted">{user.email}</p>
            </div>
          </div>
        </motion.div>

        {/* القوائم */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="mt-3 overflow-hidden rounded-3xl border border-jadeed-line bg-white shadow-soft">
          <button onClick={() => go('a05')} className="flex w-full items-center gap-3 p-4 text-start transition hover:bg-jadeed-bg">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-jadeed-tint text-jadeed-purple"><MapPin size={19} /></span>
            <span className="grow">
              <span className="block text-xs font-extrabold">موقعي</span>
              <span className="block text-[11px] text-jadeed-muted">{user.city}</span>
            </span>
            <ChevronLeft size={16} className="text-jadeed-ghost" />
          </button>

          <div className="h-px bg-jadeed-line/60" />

          <button onClick={() => go('a13')} className="flex w-full items-center gap-3 p-4 text-start transition hover:bg-jadeed-bg">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-jadeed-tint text-jadeed-purple"><FileText size={19} /></span>
            <span className="grow">
              <span className="block text-xs font-extrabold">طلباتي</span>
              <span className="block text-[11px] text-jadeed-muted">٥ طلبات · طلب جارٍ واحد</span>
            </span>
            <ChevronLeft size={16} className="text-jadeed-ghost" />
          </button>

          <div className="h-px bg-jadeed-line/60" />

          <button onClick={() => go('b01')} className="flex w-full items-center gap-3 p-4 text-start transition hover:bg-jadeed-bg">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-jadeed-yellow-tint text-jadeed-yellow-dark"><Store size={19} /></span>
            <span className="grow">
              <span className="block text-xs font-extrabold">أضف متجرك على جديد</span>
              <span className="block text-[11px] text-jadeed-muted">سجّل كتاجر — حسابك نفسه يبيع ويشتري · التوثيق ٢٤–٤٨ ساعة</span>
            </span>
            <ChevronLeft size={16} className="text-jadeed-ghost" />
          </button>

          <div className="h-px bg-jadeed-line/60" />

          <div className="flex w-full items-center gap-3 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-jadeed-tint text-jadeed-purple"><Bell size={19} /></span>
            <span className="grow">
              <span className="block text-xs font-extrabold">الإشعارات</span>
              <span className="block text-[11px] text-jadeed-muted">تحديثات الطلبات والعروض</span>
            </span>
            {/* مفتاح التبديل */}
            <button
              onClick={() => setNotif((v) => !v)}
              className={`relative h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${notif ? 'bg-jadeed-purple' : 'bg-jadeed-gray'}`}
            >
              <motion.span
                animate={{ x: notif ? -20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="block h-5 w-5 rounded-full bg-white shadow-soft"
              />
            </button>
          </div>
        </motion.div>

        {/* منطقة الحساب — V3 */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-3 overflow-hidden rounded-3xl border border-jadeed-red/20 bg-jadeed-red-tint/60 shadow-soft">
          <button onClick={() => go('a18')} className="flex w-full items-center gap-3 p-4 text-start transition hover:bg-jadeed-red-tint">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-jadeed-red/10 text-jadeed-red"><Trash2 size={19} /></span>
            <span className="grow">
              <span className="block text-xs font-extrabold text-jadeed-red">حذف الحساب بشكل نهائي</span>
              <span className="block text-[11px] leading-4 text-jadeed-muted">حذف دائم لبياناتك وطلباتك — لا رجعة فيه (DD-10)</span>
            </span>
            <ChevronLeft size={16} className="text-jadeed-red/60" />
          </button>
          <div className="h-px bg-jadeed-red/10" />
          <button onClick={() => go('a01')} className="flex w-full items-center gap-3 p-4 text-start transition hover:bg-jadeed-red-tint">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-jadeed-red/10 text-jadeed-red"><LogOut size={19} /></span>
            <span className="grow text-xs font-extrabold text-jadeed-red">تسجيل الخروج</span>
          </button>
        </motion.div>

        <p className="mt-4 text-center text-[10px] text-jadeed-ghost">جديد · إصدار V3 — شاشة A-16 مع حذف الحساب</p>
      </div>

      <BottomNav active="me" />
    </div>
  )
}
