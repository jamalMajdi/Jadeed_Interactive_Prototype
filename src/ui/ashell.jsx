import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Building2, ClipboardCheck, FileClock, KeyRound, Megaphone, Menu, Search, ShoppingBag,
  Store, Tags, Truck, Users, X,
} from 'lucide-react'
import { useNav } from './nav.jsx'

/* قائمة تنقل هيكل الإدارة — تطابق ADMIN_NAV في حزمة V3 */
export const ADMIN_NAV = [
  { key: 'c03', label: 'طلبات التوثيق', Icon: ClipboardCheck },
  { key: 'c05', label: 'طلبات المتاجر', Icon: Store },
  { key: 'c07', label: 'إدارة المستخدمين', Icon: Users },
  { key: 'c09', label: 'نظرة التجار', Icon: Building2 },
  { key: 'c10', label: 'منتجات التجار', Icon: ShoppingBag },
  { key: 'c12', label: 'تتبع الطلبات', Icon: Truck },
  { key: 'c18', label: 'الفئات ★', Icon: Tags },
  { key: 'c19', label: 'العروض والبنرات ★', Icon: Megaphone },
  { key: 'c14', label: 'أدوار المشرفين', Icon: KeyRound },
  { key: 'c15', label: 'سجل النشاط', Icon: FileClock },
]

/* محتوى السايدبار — مشترك بين النسخة الثابتة والدرج المنسدل */
function SideContent({ active, onNav, onClose }) {
  return (
    <>
      <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-jadeed-orange text-[11px] font-extrabold">ج</span>
        <div className="grow leading-tight">
          <p className="text-xs font-extrabold">جديد · للإدارة</p>
          <p className="text-[9px] text-white/40">Admin Console</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white">
            <X size={15} strokeWidth={2.4} />
          </button>
        )}
      </div>
      <nav className="side-scroll grow overflow-y-auto p-2">
        {ADMIN_NAV.map(({ key, label, Icon }) => {
          const on = active === key
          return (
            <button
              key={key}
              onClick={() => onNav(key)}
              className={`mb-0.5 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-start text-xs transition ${on ? 'bg-jadeed-purple/35 font-extrabold text-white ring-1 ring-jadeed-purple-light/40' : 'font-bold text-white/55 hover:bg-white/5 hover:text-white'}`}
            >
              <Icon size={15} className={on ? 'text-jadeed-orange' : 'text-white/35'} />
              {label}
            </button>
          )
        })}
      </nav>
      <div className="border-t border-white/10 px-4 py-2.5 text-[9px] leading-4 text-white/30">
        جرد V3: ٢٢ شاشة/حالة إدارة · C-18/C-19 بطلب العميل ★
      </div>
    </>
  )
}

/* هيكل نافذة سطح المكتب للإدارة (RTL):
   lg+  → سايدبار ثابت يمين
   <lg  → سايدبار مخفي يُفتح كدرج زنبركي بزر همبرغر */
export function AdminShell({ active, children }) {
  const { go } = useNav()
  const [menu, setMenu] = useState(false)
  const nav = (k) => { go(k); setMenu(false) }

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-jadeed-bg" dir="rtl">
      {/* السايدبار الثابت — شاشات lg وأكبر */}
      <aside className="hidden w-56 shrink-0 flex-col bg-[#17141F] text-white lg:flex">
        <SideContent active={active} onNav={nav} />
      </aside>

      {/* الدرج المنسدل — تابلت وجوال */}
      <AnimatePresence>
        {menu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenu(false)}
              className="absolute inset-0 z-40 bg-jadeed-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="absolute inset-y-0 right-0 z-50 flex w-64 flex-col bg-[#17141F] text-white shadow-phone lg:hidden"
            >
              <SideContent active={active} onNav={nav} onClose={() => setMenu(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* العمود الرئيسي */}
      <div className="flex min-w-0 grow flex-col">
        {/* الشريط العلوي */}
        <header className="z-10 flex h-12 shrink-0 items-center justify-between gap-3 border-b border-jadeed-line bg-white px-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2">
            <button
              onClick={() => setMenu(true)}
              title="قائمة الإدارة"
              className="rounded-xl border border-jadeed-line bg-white p-2 text-jadeed-black shadow-soft transition hover:text-jadeed-purple lg:hidden"
            >
              <Menu size={16} />
            </button>
            <p className="truncate text-xs font-extrabold" dir="ltr">admin@jadeed.ye</p>
            <span className="hidden rounded-lg bg-jadeed-tint px-2 py-0.5 text-[10px] font-extrabold text-jadeed-purple sm:block">
              مدير عام
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-jadeed-line bg-jadeed-bg px-3 py-1.5 md:flex">
              <Search size={13} className="text-jadeed-ghost" />
              <input placeholder="بحث سريع…" className="w-36 bg-transparent text-[11px] outline-none placeholder:text-jadeed-ghost lg:w-40" />
            </div>
            <span className="relative rounded-xl border border-jadeed-line bg-white p-1.5 text-jadeed-muted">
              <BellPlaceholder />
            </span>
          </div>
        </header>

        {/* المحتوى */}
        <main className="side-scroll grow overflow-y-auto p-3 sm:p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}

function BellPlaceholder() {
  return (
    <span className="relative block">
      <motion.span
        animate={{ rotate: [0, -12, 12, -8, 0] }}
        transition={{ repeat: Infinity, repeatDelay: 5, duration: 0.5 }}
        className="block"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
      </motion.span>
      <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-jadeed-orange ring-2 ring-white" />
    </span>
  )
}

/* ── عناصر مشتركة لصفحات الإدارة ── */
export function APage({ title, sub, actions, children }) {
  return (
    <div className="mx-auto w-full max-w-6xl 2xl:max-w-7xl">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-base font-extrabold sm:text-lg">{title}</h1>
          {sub && <p className="mt-0.5 text-xs text-jadeed-muted">{sub}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  )
}

const BADGE_TONES = {
  ok: 'bg-jadeed-tint text-jadeed-purple',
  orange: 'bg-jadeed-orange-tint text-jadeed-orange',
  warn: 'bg-jadeed-yellow-tint text-jadeed-yellow-dark',
  err: 'bg-jadeed-red-tint text-jadeed-red',
  gray: 'bg-jadeed-gray text-jadeed-muted',
  purple: 'bg-jadeed-purple text-white',
}

export function ABadge({ tone = 'gray', children }) {
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${BADGE_TONES[tone]}`}>{children}</span>
}

/* جدول متجاوب بالكامل (Fluid — بلا تمرير أفقي):
   md+  → جدول كامل
   <md  → بطاقات عمودية: كل صف بطاقة، وعنوان العمود بجانب قيمته */
export function ATable({ head, rows }) {
  const norm = rows.map((r, i) => (Array.isArray(r) ? { key: i, cells: r } : r))
  return (
    <div className="overflow-hidden rounded-2xl border border-jadeed-line bg-white shadow-soft">
      {/* جدول — لابتوب وأكبر */}
      <div className="hidden lg:block">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#FAF9FC] text-[11px] text-jadeed-muted">
              {head.map((h) => (
                <th key={h} className="px-4 py-3 text-start font-extrabold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {norm.map((r) => (
              <tr key={r.key} className="border-t border-jadeed-line/70 transition hover:bg-jadeed-tint/30">
                {r.cells.map((c, i) => (
                  <td key={i} className="px-4 py-3.5">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* بطاقات — تابلت فأصغر (بلا أي تمرير أفقي) */}
      <div className="divide-y divide-jadeed-line/70 lg:hidden">
        {norm.map((r) => (
          <div key={r.key} className="space-y-2 p-4">
            {r.cells.map((c, i) => (
              <div key={i} className={`flex items-start justify-between gap-3 ${i === 0 ? 'mb-1' : ''}`}>
                <span className="shrink-0 pt-0.5 text-[10px] font-extrabold text-jadeed-ghost">{head[i]}</span>
                <span className="min-w-0 text-end">{c}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function AEmpty({ title = 'لا توجد بيانات', sub }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-jadeed-line bg-white py-14 text-center">
      <p className="text-sm font-extrabold">{title}</p>
      {sub && <p className="max-w-sm text-xs leading-5 text-jadeed-muted">{sub}</p>}
    </div>
  )
}

/* هيكل تحميل C-17 */
export function ASkel({ rows = 5, cols = 5 }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-jadeed-line bg-white">
      {[...Array(rows)].map((_, r) => (
        <motion.div
          key={r}
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ repeat: Infinity, duration: 1.3, delay: r * 0.12 }}
          className="flex items-center gap-4 border-b border-jadeed-line/60 p-4 last:border-0"
        >
          {[...Array(cols)].map((_, c) => (
            <div key={c} className={`h-3.5 rounded-full bg-jadeed-gray ${c === 0 ? 'w-1/5' : c === 1 ? 'w-1/4' : 'w-1/6'}`} />
          ))}
        </motion.div>
      ))}
    </div>
  )
}
