import { AlertTriangle, Check } from 'lucide-react'
import { Dialog } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'
import B10 from './B10Products.jsx'

/* B-13 — تأكيد حذف منتج (Dialog فوق قائمة المنتجات) */
export default function B13() {
  const { go } = useNav()
  const { removeProduct } = useMStore()
  const p = { id: 'mp1', name: 'طماطم بلدي طازجة' }

  return (
    <div className="relative h-full">
      <div className="pointer-events-none h-full">
        <B10 />
      </div>

      <Dialog>
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-jadeed-red-tint text-jadeed-red">
            <AlertTriangle size={24} />
          </span>
          <div>
            <h3 className="text-sm font-extrabold">حذف «{p.name}»؟</h3>
            <p className="mt-1 text-[11px] leading-5 text-jadeed-muted">
              سيُزال المنتج من متجرك نهائيًا — الطلبات السابقة المرتبطة به تبقى محفوظة في سجلك.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-jadeed-bg p-3 text-[11px] leading-5 text-jadeed-muted">
          <b className="text-jadeed-black">ملاحظة:</b> إذا كان المنتج مرتبطًا بطلب جارٍ، سيظهر لك تنبيه فشل الحذف (راجع B-19).
        </div>

        <div className="mt-5 flex gap-2.5">
          <button
            onClick={() => go('b10')}
            className="w-1/3 rounded-2xl border border-jadeed-line py-3 text-xs font-extrabold text-jadeed-muted transition hover:bg-jadeed-bg"
          >
            تراجع
          </button>
          <button
            onClick={() => { removeProduct(p.id, p.name); go('b10') }}
            className="w-2/3 rounded-2xl bg-jadeed-red py-3 text-xs font-extrabold text-white shadow-pop transition hover:opacity-90"
          >
            <span className="inline-flex items-center gap-1.5"><Check size={14} strokeWidth={2.6} /> حذف نهائي</span>
          </button>
        </div>
      </Dialog>
    </div>
  )
}
