import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ImagePlus, Info } from 'lucide-react'
import { GradHeader, ProductIcon, tileCls, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'
import { useAStore } from '../ui/astore.jsx'

const UNITS = ['كيلو', 'عبوة', 'حبة', 'لتر', 'طبق']

/* B-11 — إضافة منتج (تصنيف إجباري — V3) · B-12 — تعديل منتج */
export default function B11({ state = 'add' }) {
  const { go } = useNav()
  const { toast } = useMStore()
  const { cats } = useAStore()
  const CATS = ['— اختر التصنيف —', ...cats.map((c) => c.name)] // حية من إدارة الفئات C-18 ★
  const edit = state === 'edit'
  const [cat, setCat] = useState(edit ? 'خضار وفواكه' : '')
  const badCat = !cat || cat.startsWith('—')

  return (
    <div className="flex h-full flex-col bg-white">
      <GradHeader
        title={edit ? 'تعديل منتج' : 'منتج جديد'}
        sub={edit ? 'B-12 — النموذج معبأ ببيانات المنتج' : 'يُنشر مباشرة في متجرك بعد الحفظ'}
        onBack={() => go('b10')}
      />

      <div className="no-scrollbar relative z-20 -mt-4 grow overflow-y-auto rounded-t-3xl bg-white px-5 pb-6 pt-5">
        {/* صورة المنتج */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-4 flex justify-center">
          <div className={`relative flex h-24 w-24 items-center justify-center rounded-3xl ${tileCls(0)} ${edit ? '' : 'border-2 border-dashed border-jadeed-line'}`}>
            {edit ? <ProductIcon name="Carrot" size={40} /> : <ImagePlus size={26} className="text-jadeed-ghost" />}
            <span className="absolute -bottom-1 -left-1 rounded-full bg-jadeed-orange p-2 text-white shadow-pop">
              <ImagePlus size={12} />
            </span>
          </div>
        </motion.div>

        <div className="space-y-3.5">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
            <span className="mb-1 block text-[11px] font-bold">اسم المنتج *</span>
            <input
              defaultValue={edit ? 'طماطم بلدي طازجة' : ''}
              placeholder="مثال: طماطم بلدي طازجة"
              className="w-full rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 text-xs outline-none focus:border-jadeed-purple focus:bg-white"
            />
          </motion.div>

          {/* التصنيف — إجباري ومربوط بفئات الإدارة C-18 (V3) */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}>
            <span className="mb-1 block text-[11px] font-bold">
              التصنيف * <span className="font-normal text-jadeed-ghost">(من فئات الإدارة C-18)</span>
            </span>
            <div className="relative">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className={`w-full appearance-none rounded-xl border bg-jadeed-bg px-3.5 py-3 text-xs font-bold outline-none focus:bg-white ${badCat ? 'border-jadeed-line' : 'border-jadeed-purple/50'}`}
              >
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-jadeed-ghost" />
            </div>
            {badCat && <span className="mt-1 block text-[10px] font-bold text-jadeed-red">التصنيف إجباري — اختر من الفئات المعتمدة (V3)</span>}
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
              <span className="mb-1 block text-[11px] font-bold">السعر (ريال) *</span>
              <input defaultValue={edit ? 900 : ''} placeholder="0" inputMode="numeric" className="w-full rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 text-xs outline-none focus:border-jadeed-purple focus:bg-white" />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
              <span className="mb-1 block text-[11px] font-bold">وحدة البيع *</span>
              <div className="relative">
                <select defaultValue={edit ? 'كيلو' : UNITS[0]} className="w-full appearance-none rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 text-xs font-bold outline-none focus:border-jadeed-purple focus:bg-white">
                  {UNITS.map((u) => <option key={u}>{u}</option>)}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-jadeed-ghost" />
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}>
            <span className="mb-1 block text-[11px] font-bold">الكمية المتوفرة *</span>
            <input defaultValue={edit ? 18 : ''} placeholder="0" inputMode="numeric" className="w-full rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 text-xs outline-none focus:border-jadeed-purple focus:bg-white" />
            <span className="mt-1 block text-[10px] text-jadeed-muted">عند وصولها ٠ يظهر المنتج «غير متوفر» للعملاء تلقائيًا</span>
          </motion.div>
        </div>

        <motion.button
          variants={fadeUp} initial="hidden" animate="show" custom={5}
          disabled={badCat}
          onClick={() => { toast(edit ? 'حُفظت تعديلات المنتج ✓' : 'نُشر المنتج ✓ — ظاهر للعملاء الآن', 'ok'); go('b10') }}
          className={`mt-6 w-full rounded-2xl py-3.5 text-sm font-extrabold transition active:scale-[.98] ${badCat ? 'bg-jadeed-gray text-jadeed-ghost' : 'bg-jadeed-orange text-white shadow-pop hover:bg-jadeed-orange-light'}`}
        >
          {edit ? 'حفظ التعديلات' : 'نشر المنتج'}
        </motion.button>

        <p className="mt-3 flex items-start justify-center gap-1 text-center text-[10px] leading-4 text-jadeed-ghost">
          <Info size={11} className="mt-0.5 shrink-0" />
          فشل الحفظ (شبكة/قاعدة بيانات) → تنبيه فوري مع الحفظ المحلي — راجع B-19
        </p>
      </div>
    </div>
  )
}
