import { motion } from 'framer-motion'
import { Search, ChevronDown, ChevronLeft, MapPin, MapPinOff, PackageOpen, RotateCcw } from 'lucide-react'
import { StatusBar, Logo, BottomNav, RatingChip, fadeUp, ProductIcon, tileCls } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'
import { useAStore } from '../ui/astore.jsx'
import { stores, products, fmt } from '../data/db.js'

/* ── بطاقة متجر ── */
function StoreCard({ s, i }) {
  const { go } = useNav()
  return (
    <motion.li variants={fadeUp} initial="hidden" animate="show" custom={i} className="list-none">
      <motion.button
        whileHover={{ y: -2, boxShadow: '0 10px 26px rgba(80,2,201,.14)' }}
        whileTap={{ scale: 0.985 }}
        onClick={() => go('a07')}
        className="flex w-full items-center gap-3 rounded-2xl border border-jadeed-line bg-white p-3 text-start shadow-soft transition-colors hover:border-[#D8C8F5]"
      >
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#F1E9FF] to-[#EBEBEB]">
          <StoreGlyph />
          <span className="absolute bottom-1 left-1 rounded-full bg-jadeed-black/80 px-1.5 py-0.5 text-[9px] font-bold text-white">{s.dist}</span>
        </div>
        <div className="min-w-0 grow">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-sm font-extrabold">{s.name}</h3>
            <RatingChip value={s.rating} />
          </div>
          <p className="mt-0.5 truncate text-xs text-jadeed-muted">{s.cat}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${s.open ? 'bg-jadeed-tint text-jadeed-purple' : 'bg-jadeed-gray text-jadeed-muted'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${s.open ? 'bg-jadeed-purple' : 'bg-jadeed-ghost'}`} />
              {s.open ? `مفتوح · ${s.eta}` : 'مغلق حاليًا'}
            </span>
            <ChevronLeft size={16} className="text-jadeed-ghost" />
          </div>
        </div>
      </motion.button>
    </motion.li>
  )
}

function StoreGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5002c9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 9.5h15l-1.2-4.5H5.7zM5 9.5V20h14V9.5M5 13.5h14M10 20v-4.5h4V20" />
    </svg>
  )
}

/* ── رأس الرئيسية ── */
function HomeHeader() {
  const { go } = useNav()
  return (
    <div className="relative z-10 bg-gradient-to-b from-jadeed-purple to-jadeed-purple-light px-5 pb-16 pt-3 text-white">
      <StatusBar light />
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size={36} />
          <div className="leading-tight">
            <p className="text-lg font-extrabold">جديد</p>
            <p className="text-[10px] font-medium text-white/75">Jadeed Market</p>
          </div>
        </div>
        <button onClick={() => go('a05')} className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold transition hover:bg-white/25">
          <MapPin size={14} /> عدن — كريتر <ChevronDown size={13} />
        </button>
      </div>
    </div>
  )
}

/* ── الشاشة — A-06 بحالاتها ── */
export default function A06({ state = 'default' }) {
  const { go } = useNav()
  const { toast, storeOpen } = useMStore()
  const { approvedStores } = useAStore()

  /* حالة الهيكل العظمي A-06L */
  if (state === 'skeleton') {
    const pulse = (i) => (
      <motion.div
        key={i}
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.18 }}
        className="flex items-center gap-3 rounded-2xl border border-jadeed-line bg-white p-3 shadow-soft"
      >
        <div className="h-16 w-16 rounded-xl bg-jadeed-gray" />
        <div className="grow space-y-2.5">
          <div className="h-3 w-2/3 rounded-full bg-jadeed-gray" />
          <div className="h-2.5 w-1/2 rounded-full bg-jadeed-gray/70" />
          <div className="h-2.5 w-1/3 rounded-full bg-jadeed-gray/50" />
        </div>
      </motion.div>
    )
    return (
      <div className="flex h-full flex-col bg-jadeed-bg">
        <HomeHeader />
        <div className="relative z-20 -mt-8 px-4">
          <div className="flex items-center gap-3 rounded-2xl border border-jadeed-line bg-white px-4 py-3.5 shadow-card">
            <Search size={19} className="text-jadeed-ghost" />
            <span className="text-sm text-jadeed-ghost">جارٍ تحديد موقعك…</span>
          </div>
        </div>
        <div className="grow space-y-3 px-4 pt-6">
          {[0, 1, 2, 3].map(pulse)}
          <p className="pt-2 text-center text-[11px] text-jadeed-muted">جارٍ تحميل المتاجر القريبة…</p>
        </div>
        <BottomNav active="home" />
      </div>
    )
  }

  /* الحالات الفارغة / رفض الإذن */
  if (state === 'empty' || state === 'denied') {
    const empty = state === 'empty'
    return (
      <div className="flex h-full flex-col bg-jadeed-bg">
        <HomeHeader />
        <div className="relative z-20 -mt-8 px-4">
          <button onClick={() => go('a09')} className="flex w-full items-center gap-3 rounded-2xl border border-jadeed-line bg-white px-4 py-3.5 text-start shadow-card transition hover:shadow-pop">
            <Search size={19} className="shrink-0 text-jadeed-ghost" />
            <span className="grow text-sm text-jadeed-ghost">ابحث عن منتج في متاجر قريبة…</span>
          </button>
        </div>
        <div className="grow px-4 pb-4">
          {empty ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-jadeed-tint text-jadeed-purple">
                <PackageOpen size={38} strokeWidth={1.6} />
              </div>
              <h3 className="text-base font-extrabold">لا توجد متاجر قريبة منك</h3>
              <p className="text-xs leading-6 text-jadeed-muted">جرّب توسيع نطاق البحث أو تحديث موقعك الحالي</p>
              <button
                onClick={() => toast('أُعيد البحث — لا تزال القائمة فارغة ضمن نطاق ٥ كم', 'info')}
                className="mt-2 flex items-center gap-2 rounded-2xl bg-jadeed-tint px-5 py-3 text-xs font-extrabold text-jadeed-purple transition hover:shadow-pop"
              >
                <RotateCcw size={15} /> تحديث القائمة
              </button>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-jadeed-yellow-tint text-jadeed-yellow-dark">
                <MapPinOff size={38} strokeWidth={1.6} />
              </div>
              <h3 className="text-base font-extrabold">لم نتمكن من تحديد موقعك</h3>
              <p className="text-xs leading-6 text-jadeed-muted">فعّل إذن الموقع من إعدادات الجهاز، أو أدخل موقعك يدويًا</p>
              <button
                onClick={() => go('a05d')}
                className="mt-2 rounded-2xl bg-jadeed-tint px-5 py-3 text-xs font-extrabold text-jadeed-purple transition hover:shadow-pop"
              >
                إدخال الموقع يدويًا
              </button>
            </div>
          )}
        </div>
        <BottomNav active="home" />
      </div>
    )
  }

  /* الحالة الافتراضية — الشاشة المعيارية ★ */
  return (
    <div className="flex h-full flex-col bg-jadeed-bg">
      <HomeHeader />

      {/* البحث العائم */}
      <div className="relative z-20 -mt-8 px-4">
        <button
          onClick={() => go('a09')}
          className="flex w-full items-center gap-3 rounded-2xl border border-jadeed-line bg-white px-4 py-3.5 text-start shadow-card transition hover:shadow-pop"
        >
          <Search size={19} className="shrink-0 text-jadeed-ghost" />
          <span className="grow text-sm text-jadeed-ghost">ابحث عن منتج في متاجر قريبة…</span>
        </button>
      </div>

      {/* المحتوى */}
      <div className="no-scrollbar grow overflow-y-auto px-4 pb-5">
        {/* شريط المنتجات القريبة — اكتشاف مباشر للمنتجات دون المساس بـ«المتاجر أولًا» (UC-03) */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-extrabold">منتجات قريبة منك</p>
            <button onClick={() => go('a09')} className="text-[11px] font-extrabold text-jadeed-purple transition hover:opacity-80">بحث المنتجات ←</button>
          </div>
          <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1">
            {products.filter((p) => p.stock).slice(0, 6).map((p, i) => (
              <button
                key={p.id}
                onClick={() => go('a08')}
                className="w-28 shrink-0 rounded-2xl border border-jadeed-line bg-white p-2.5 text-start shadow-soft transition hover:shadow-pop"
              >
                <div className={`flex h-14 items-center justify-center rounded-xl ${tileCls(i)}`}>
                  <ProductIcon name={p.icon} size={24} />
                </div>
                <p className="mt-1.5 truncate text-[10px] font-extrabold">{p.name}</p>
                <p className="truncate text-[9px] text-jadeed-muted">{p.store}</p>
                <p className="mt-0.5 text-[10px] font-extrabold text-jadeed-purple">{fmt(p.price)}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3 mt-5 flex items-end justify-between">
          <div>
            <h1 className="text-base font-extrabold">المتاجر القريبة</h1>
            <p className="mt-0.5 text-xs text-jadeed-muted">مرتبة حسب الأقرب من موقعك</p>
          </div>
          <button
            onClick={() => go('a09b')}
            className="rounded-full bg-jadeed-tint px-2.5 py-1 text-[11px] font-extrabold text-jadeed-purple transition hover:shadow-pop"
          >
            الأقرب أولًا
          </button>
        </div>

        <ul className="space-y-3">
          {/* متجر التاجر يعيش في mstore: إغلاقه من «متجري» (B-09) يظهر فورًا للعميل */}
          {stores.map((s, i) => (
            <StoreCard key={s.id} s={s.id === 's1' ? { ...s, open: storeOpen } : s} i={i} />
          ))}
          {/* المتاجر الموثقة/المعتمدة لحظيًا من لوحة الإدارة (C-04/C-06) تظهر هنا فورًا */}
          {approvedStores.map((s, i) => (
            <StoreCard key={s.id} s={s} i={stores.length + i} />
          ))}
        </ul>
      </div>

      <BottomNav active="home" />
    </div>
  )
}
