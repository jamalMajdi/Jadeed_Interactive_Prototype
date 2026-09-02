import { BarChart3, ClipboardList, LayoutDashboard, Package, Store } from 'lucide-react'
import { useNav } from './nav.jsx'
import { useMStore } from './mstore.jsx'

/* الشريط السفلي لتطبيق التاجر — مع شارة الطلبات الجديدة الحية (تنبيهات فورية · Squad-3) */
const ITEMS = [
  { key: 'home', label: 'لوحتي', to: 'b07', Icon: LayoutDashboard },
  { key: 'products', label: 'منتجاتي', to: 'b10', Icon: Package },
  { key: 'orders', label: 'الطلبات', to: 'b15', Icon: ClipboardList },
  { key: 'store', label: 'متجري', to: 'b09', Icon: Store },
  { key: 'stats', label: 'الإحصائيات', to: 'b17', Icon: BarChart3 },
]

export default function MerchantNav({ active }) {
  const { go } = useNav()
  const { orders } = useMStore()
  const news = orders.filter((o) => o.status === 'new').length
  return (
    <nav className="z-10 border-t border-jadeed-line bg-white px-2 pb-2 pt-1.5">
      <ul className="grid grid-cols-5">
        {ITEMS.map(({ key, label, to, Icon }) => {
          const on = key === active
          return (
            <li key={key}>
              <button
                onClick={() => go(to)}
                aria-label={label}
                aria-current={on ? 'page' : undefined}
                className={`flex w-full flex-col items-center gap-1 rounded-2xl px-2 py-1 transition ${on ? 'text-jadeed-purple' : 'text-jadeed-ghost hover:text-jadeed-purple'}`}
              >
                <span className={`relative flex h-9 w-14 items-center justify-center ${on ? 'rounded-full bg-jadeed-tint' : ''}`}>
                  <Icon size={20} strokeWidth={1.9} />
                  {/* شارة الطلبات الجديدة — عدّاد حي يوفر فتح B-15 (تنبيه فوري · Squad-3) */}
                  {key === 'orders' && news > 0 && (
                    <span className="absolute -top-1 end-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-jadeed-orange px-1 text-[9px] font-extrabold text-white ring-2 ring-white">
                      {news}
                    </span>
                  )}
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
