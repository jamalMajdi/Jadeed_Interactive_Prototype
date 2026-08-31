import { APage, ATable, ABadge } from '../../ui/ashell.jsx'
import { useAStore } from '../../ui/astore.jsx'
import { SEED_ROLES } from '../../data/admin.js'

const TONE = { purple: 'ok', orange: 'orange', yellow: 'warn', gray: 'gray' }

/* C-14 — إدارة أدوار المشرفين (هيكل أولي — انظر Gap-07) */
export default function C14() {
  const { toast } = useAStore()

  return (
    <APage title="أدوار المشرفين" sub="هيكل أولي — التفصيل الكامل للصلاحيات مؤجل (انظر Gap-07 في حزمة V3)">
      <ATable
        head={['الدور', 'المستخدمون', 'الصلاحيات', '']}
        rows={SEED_ROLES.map((r) => ({
          key: r.role,
          cells: [
            <span className="font-extrabold">{r.role}</span>,
            <span className="font-bold">{r.users}</span>,
            <span className="flex flex-wrap gap-1.5">
              {r.perms.map((p) => (
                <ABadge key={p} tone={TONE[r.tone]}>{p}</ABadge>
              ))}
            </span>,
            <button
              onClick={() => toast('مصفوفة الصلاحيات التفصيلية مؤجلة — انظر Gap-07 في حزمة V3', 'info')}
              className="rounded-xl border border-jadeed-line px-3 py-1.5 text-[10px] font-extrabold text-jadeed-muted transition hover:text-jadeed-purple"
            >
              تعديل الصلاحيات
            </button>,
          ],
        }))}
      />

      <p className="mt-3 rounded-xl bg-jadeed-yellow-tint px-3.5 py-2.5 text-[11px] leading-5 text-jadeed-yellow-dark">
        Gap-07: وثائق التحليل لم تحدد مصفوفة صلاحيات كاملة لكل دور — المعروض هيكل أولي تم اعتماده بقرار تصميم وموثق في الحزمة.
      </p>
    </APage>
  )
}
