import { BarChart3, ClipboardList, LayoutDashboard, Package, Store } from 'lucide-react'
import { useNav } from './nav.jsx'

/* الشريط السفلي لتطبيق التاجر */
const ITEMS = [
  { key: 'home', label: 'لوحتي', to: 'b07', Icon: LayoutDashboard },
  { key: 'products', label: 'منتجاتي', to: 'b10', Icon: Package },
  { key: 'orders', label: 'الطلبات', to: 'b15', Icon: ClipboardList },
  { key: 'store', label: 'متجري', to: 'b09', Icon: Store },
  { key: 'stats', label: 'الإحصائيات', to: 'b17', Icon: BarChart3 },
]

export default function MerchantNav({ active }) {
  const { go } = useNav()
  return (
    <nav className="z-10 border-t border-jadeed-line bg-white px-2 pb-2 pt-1.5">
      <ul className="grid grid-cols-5">
        {ITEMS.map(({ key, label, to, Icon }) => {
          const on = key === active
          return (
            <li key={key}>
              <button
                onClick={() => go(to)}
                className={`flex w-full flex-col items-center gap-1 rounded-2xl px-2 py-1 transition ${on ? 'text-jadeed-purple' : 'text-jadeed-ghost hover:text-jadeed-purple'}`}
              >
                <span className={`flex h-9 w-14 items-center justify-center ${on ? 'rounded-full bg-jadeed-tint' : ''}`}>
                  <Icon size={20} strokeWidth={1.9} />
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
