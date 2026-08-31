import { motion } from 'framer-motion'
import {
  Signal, Wifi, BatteryMedium, Star, ChevronLeft, ChevronRight,
  Home, Search, ShoppingCart, FileText, User,
  Carrot, Apple, Milk, Egg, Croissant, Cookie, CupSoda, Fish, Sandwich, Drumstick, Store, Banana, Leaf, Salad,
} from 'lucide-react'
import { useNav } from './nav.jsx'

/* ── حركات مشتركة ─────────────────────────────── */
export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.04 + i * 0.05, type: 'spring', stiffness: 270, damping: 24 } }),
}

/* ── شريط الحالة ──────────────────────────────── */
export function StatusBar({ light = false }) {
  return (
    <div className={`relative z-10 flex items-center justify-between px-6 pt-4 text-[12px] font-medium ${light ? 'text-white/90' : 'text-jadeed-black'}`}>
      <span>٩:٤١</span>
      <div className="flex items-center gap-1.5">
        <Signal size={13} strokeWidth={2.4} />
        <Wifi size={13} strokeWidth={2.2} />
        <BatteryMedium size={17} strokeWidth={1.8} />
      </div>
    </div>
  )
}

/* ── شعار Jadeed (SVG معاد رسمه من الهوية) ────── */
export function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-label="Jadeed">
      <rect x="2" y="2" width="34" height="17" rx="1.5" fill="#ff5715" />
      <rect x="40" y="2" width="22" height="17" rx="1.5" fill="#5002c9" />
      <rect x="24" y="23" width="38" height="39" rx="1.5" fill="#5002c9" />
      <path d="M24 23 C13 25 5 34 5 45 L5 62 L20 62 L20 47 C20 40 26 34 33 33 L24 33 Z" fill="#ff5715" />
      <path d="M33 23 L33 33 C40 33 46 28 46 23 Z" fill="#ff911a" />
      <rect x="2" y="45" width="14" height="17" rx="1.5" fill="#7d22ff" />
    </svg>
  )
}

/* ── قشرة الشاشة ──────────────────────────────── */
export function ScreenShell({ children, bg = 'bg-jadeed-bg' }) {
  return <div className={`flex h-full w-full flex-col overflow-hidden ${bg}`}>{children}</div>
}

/* ── أيقونة منتج حسب البيانات ─────────────────── */
const PRODUCT_ICONS = { Carrot, Apple, Milk, Egg, Croissant, Cookie, CupSoda, Fish, Sandwich, Drumstick, Banana, Leaf, Salad }
export function ProductIcon({ name, size = 26, className = 'text-jadeed-purple' }) {
  const I = PRODUCT_ICONS[name] || Store
  return <I size={size} className={className} strokeWidth={1.7} />
}

/* بلاطات متدرجة للصور المصغّرة */
const TILES = [
  'bg-gradient-to-br from-[#F1E9FF] to-[#EBEBEB]',
  'bg-gradient-to-br from-[#FFF3E0] to-[#EBEBEB]',
  'bg-gradient-to-br from-[#FDECE5] to-[#EBEBEB]',
  'bg-gradient-to-br from-[#F1E9FF] to-[#E4E2EA]',
]
export const tileCls = (i) => TILES[i % TILES.length]

/* ── شارة التقييم ─────────────────────────────── */
export function RatingChip({ value }) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-jadeed-yellow-tint px-2 py-0.5 text-[11px] font-bold text-jadeed-yellow-dark">
      <Star size={11} className="text-jadeed-yellow" fill="currentColor" strokeWidth={0} />
      {value}
    </span>
  )
}

/* ── حالة فارغة/خطأ ───────────────────────────── */
export function EmptyState({ icon: Icon, tone = 'purple', title, sub, children }) {
  const tones = {
    purple: 'bg-jadeed-tint text-jadeed-purple',
    yellow: 'bg-jadeed-yellow-tint text-jadeed-yellow-dark',
    red: 'bg-jadeed-red-tint text-jadeed-red',
  }
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className={`flex h-20 w-20 items-center justify-center rounded-3xl ${tones[tone]}`}
      >
        <Icon size={38} strokeWidth={1.6} />
      </motion.div>
      <h3 className="text-base font-extrabold">{title}</h3>
      {sub && <p className="text-xs leading-6 text-jadeed-muted">{sub}</p>}
      {children}
    </div>
  )
}

/* ── الشريط السفلي المشترك ────────────────────── */
const NAV_ITEMS = [
  { key: 'home', label: 'الرئيسية', to: 'a06', Icon: Home },
  { key: 'search', label: 'بحث', to: 'a09', Icon: Search },
  { key: 'cart', label: 'السلة', to: 'a10', Icon: ShoppingCart },
  { key: 'orders', label: 'طلباتي', to: 'a13', Icon: FileText },
  { key: 'me', label: 'حسابي', to: 'a16', Icon: User },
]

export function BottomNav({ active }) {
  const { go } = useNav()
  return (
    <nav className="z-10 border-t border-jadeed-line bg-white px-2 pb-2 pt-1.5">
      <ul className="grid grid-cols-5">
        {NAV_ITEMS.map(({ key, label, to, Icon }) => {
          const on = key === active
          return (
            <li key={key}>
              <button
                onClick={() => go(to)}
                className={`flex w-full flex-col items-center gap-1 rounded-2xl px-2 py-1 transition ${on ? 'text-jadeed-purple' : 'text-jadeed-ghost hover:text-jadeed-purple'}`}
              >
                <span className={`flex h-9 w-14 items-center justify-center ${on ? 'rounded-full bg-jadeed-tint' : ''}`}>
                  <Icon size={21} strokeWidth={1.9} />
                </span>
                <span className={`text-[11px] ${on ? 'font-extrabold' : 'font-bold'}`}>{label}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <div className="mx-auto mt-1.5 h-1 w-28 rounded-full bg-jadeed-black/20" />
    </nav>
  )
}

/* ── لوحة سفلية (Bottom Sheet) ────────────────── */
export function Sheet({ children, onClose }) {
  return (
    <div className="absolute inset-0 z-40">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-jadeed-black/45"
      />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white p-5 pb-6 shadow-card"
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-jadeed-gray" />
        {children}
      </motion.div>
    </div>
  )
}

/* ── مودال (Dialog) ───────────────────────────── */
export function Dialog({ children }) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-jadeed-black/50" />
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 14 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        className="relative w-full rounded-3xl bg-white p-5 shadow-pop"
      >
        {children}
      </motion.div>
    </div>
  )
}

/* ── رأس بنفسجي متدرج مشترك ───────────────────── */
export function GradHeader({ title, sub, onBack, children }) {
  return (
    <div className="relative z-10 bg-gradient-to-b from-jadeed-purple to-jadeed-purple-light px-5 pb-6 text-white">
      <StatusBar light />
      <div className="mt-2 flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="rounded-full bg-white/15 p-2 transition hover:bg-white/25">
            <ChevronRight size={18} />
          </button>
        )}
        <div className="min-w-0">
          {title && <h1 className="truncate text-lg font-extrabold">{title}</h1>}
          {sub && <p className="truncate text-[11px] text-white/75">{sub}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}
