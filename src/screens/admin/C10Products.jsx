import { PackageSearch } from 'lucide-react'
import { APage, ATable, ABadge } from '../../ui/ashell.jsx'
import { useNav } from '../../ui/nav.jsx'
import { SEED_MERCHANT_PRODUCTS } from '../../data/admin.js'
import { fmt } from '../../data/db.js'

/* C-10 — منتجات التاجر مجمعة حسب المتجر */
export default function C10() {
  const { go } = useNav()

  return (
    <APage title="منتجات التجار" sub="مجمعة حسب المتجر — المراجعة والإخفاء من شاشة C-11" actions={<button onClick={() => go('c11')} className="rounded-xl bg-jadeed-purple px-3.5 py-2 text-[11px] font-extrabold text-white transition hover:bg-jadeed-purple-light">مراجعة منتج مُبلّغ عنه</button>}>
      <div className="space-y-4">
        {SEED_MERCHANT_PRODUCTS.map((g) => (
          <div key={g.store}>
            <p className="mb-2 flex items-center gap-2 text-xs font-extrabold">
              {g.store}
              <ABadge tone="gray">{g.items.length} منتجات</ABadge>
            </p>
            <ATable
              head={['المنتج', 'السعر', 'الحالة', '']}
              rows={g.items.map((p) => ({
                key: p.id,
                cells: [
                  <span className="font-extrabold">{p.name}</span>,
                  <span className="font-bold text-jadeed-muted">{fmt(p.price)}</span>,
                  <span>
                    {p.status === 'available' ? <ABadge tone="ok">متوفر</ABadge> : <ABadge tone="warn">غير متوفر</ABadge>}
                    {p.reported && <span className="ms-1.5 inline-block"><ABadge tone="err">مُبلّغ عنه</ABadge></span>}
                  </span>,
                  <button onClick={() => go('c11')} className={`rounded-xl px-3 py-1.5 text-[10px] font-extrabold transition ${p.reported ? 'bg-jadeed-red text-white hover:opacity-90' : 'border border-jadeed-line text-jadeed-muted hover:text-jadeed-purple'}`}>
                    {p.reported ? 'مراجعة البلاغ' : 'عرض'}
                  </button>,
                ],
              }))}
            />
          </div>
        ))}

        <p className="flex items-center gap-2 rounded-xl bg-jadeed-orange-tint px-3.5 py-2.5 text-[11px] leading-5 text-jadeed-orange">
          <PackageSearch size={15} className="shrink-0" />
          المنتجات «غير المتوفرة» المعروضة للبيع تُبلّغ تلقائيًا لفريق المراجعة (مطابق لبانر V3 في C-11)
        </p>
      </div>
    </APage>
  )
}
