import { useState } from 'react'
import { Plus, Tags, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { APage, ABadge } from '../../ui/ashell.jsx'
import { useAStore } from '../../ui/astore.jsx'

/* C-18 ★ — إدارة الفئات (طلب عميل — خارج التحليل) — تظهر كتصنيف إجباري في B-11 */
export default function C18() {
  const { toast } = useAStore()
  const { cats, addCat, delCat } = useAStore()
  const [name, setName] = useState('')

  const add = () => {
    const n = name.trim()
    if (!n) return
    if (cats.some((c) => c.name === n)) return toast('الفئة موجودة بالفعل', 'warn')
    addCat(n)
    setName('')
    toast(`أُضيفت فئة «${n}» ✓ — ظهرت فورًا في نموذج التاجر (B-11) وفلاتر العميل (A-07)`, 'ok')
  }
  const del = (c) => {
    if (c.products > 0) return toast(`لا يمكن حذف «${c.name}» — مرتبطة بـ${c.products} منتجًا`, 'err')
    delCat(c.id)
    toast(`حُذفت فئة «${c.name}» — أُزيلت من قوائم التاجر والعميل`, 'info')
  }

  return (
    <APage title="إدارة الفئات" sub="الفئات المعتمدة التي يلتزم بها التجار عند إضافة المنتجات" actions={<ABadge tone="orange">★ طلب عميل — VFinal</ABadge>}>
      <div className="grid gap-4 lg:grid-cols-3">
        {/* إضافة */}
        <div className="rounded-2xl border border-jadeed-line bg-white p-4">
          <p className="text-xs font-extrabold">إضافة فئة جديدة</p>
          <div className="mt-3 flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && add()}
              placeholder="اسم الفئة…"
              className="w-full rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 text-xs outline-none focus:border-jadeed-purple focus:bg-white"
            />
            <button onClick={add} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-jadeed-orange text-white shadow-pop transition hover:bg-jadeed-orange-light">
              <Plus size={18} strokeWidth={2.6} />
            </button>
          </div>
          <p className="mt-3 rounded-xl bg-jadeed-tint px-3 py-2 text-[10px] leading-4 text-jadeed-purple">
            أي فئة هنا تظهر إجباريًا في قائمة «التصنيف» بمنتجات التاجر (B-11 — التصنيف إجباري V3)
          </p>
        </div>

        {/* القائمة */}
        <div className="lg:col-span-2">
          <div className="grid gap-2.5 sm:grid-cols-2">
            {cats.map((c) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-2xl border border-jadeed-line bg-white p-3.5 shadow-soft"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-jadeed-tint text-jadeed-purple">
                  <Tags size={18} />
                </span>
                <div className="grow">
                  <p className="text-xs font-extrabold">{c.name}</p>
                  <p className="text-[10px] text-jadeed-muted">{c.products} منتج مرتبط</p>
                </div>
                <button
                  onClick={() => del(c)}
                  className={`rounded-lg p-2 transition ${c.products > 0 ? 'text-jadeed-ghost/50' : 'text-jadeed-ghost hover:bg-jadeed-red-tint hover:text-jadeed-red'}`}
                  title={c.products > 0 ? 'مرتبطة بمنتجات — لا تُحذف' : 'حذف'}
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </APage>
  )
}
