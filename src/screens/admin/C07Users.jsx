import { Ban, CheckCircle2 } from 'lucide-react'
import { APage, ATable, ABadge, AEmpty } from '../../ui/ashell.jsx'
import { useNav } from '../../ui/nav.jsx'
import { useAStore } from '../../ui/astore.jsx'

/* C-07 — إدارة المستخدمين (عملاء/تجار) مع حالتهم (+ فارغة) */
export default function C07({ state = 'default' }) {
  const { go } = useNav()
  const { users } = useAStore()

  return (
    <APage
      title="إدارة المستخدمين"
      sub="كل العملاء والتجار المسجلين — الحظر يتم بحوار سبب إلزامي (C-08)"
      actions={
        <>
          <ABadge tone="ok">{users.filter((u) => u.status === 'active').length} نشط</ABadge>
          <ABadge tone="err">{users.filter((u) => u.status === 'blocked').length} محظور</ABadge>
        </>
      }
    >
      {state === 'empty' ? (
        <AEmpty title="لا مستخدمين مطابقين" sub="جرّب تعديل معايير البحث أو التصفية — القائمة تُحمّل من قاعدة البيانات المركزية" />
      ) : (
        <ATable
          head={['المستخدم', 'النوع', 'الجوال', 'الطلبات', 'الحالة', 'إجراء']}
          rows={users.map((u) => ({
            key: u.id,
            cells: [
              <span>
                <span className="block font-extrabold">{u.name}</span>
                {u.reason && <span className="block text-[10px] text-jadeed-red">السبب: {u.reason}</span>}
              </span>,
              <ABadge tone={u.type === 'تاجر' ? 'purple' : 'gray'}>{u.type}</ABadge>,
              <span className="font-mono text-[10px] text-jadeed-muted" dir="ltr">{u.phone}</span>,
              <span className="font-bold">{u.orders}</span>,
              u.status === 'active' ? <ABadge tone="ok">نشط</ABadge> : <ABadge tone="err"><Ban size={10} /> محظور</ABadge>,
              u.status === 'active' ? (
                <button onClick={() => go('c08')} className="rounded-xl border-2 border-jadeed-red/30 px-3 py-1.5 text-[10px] font-extrabold text-jadeed-red transition hover:bg-jadeed-red-tint">
                  حظر
                </button>
              ) : (
                <button onClick={() => go('c08')} className="inline-flex items-center gap-1 rounded-xl bg-jadeed-tint px-3 py-1.5 text-[10px] font-extrabold text-jadeed-purple transition hover:shadow-soft">
                  <CheckCircle2 size={11} /> رفع الحظر
                </button>
              ),
            ],
          }))}
        />
      )}
    </APage>
  )
}
