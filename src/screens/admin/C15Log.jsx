import { APage, ATable, ABadge } from '../../ui/ashell.jsx'
import { SEED_LOG } from '../../data/admin.js'

const TONE = { ok: 'ok', warn: 'warn', err: 'err', info: 'gray' }

/* C-15 — سجل النشاط (Audit/Activity Log) */
export default function C15() {
  return (
    <APage title="سجل النشاط" sub="كل عملية إدارية مسجلة بلا استثناء — غير قابل للتعديل أو الحذف" actions={<ABadge tone="gray">آخر ٢٤ ساعة</ABadge>}>
      <ATable
        head={['الوقت', 'المستخدم', 'الحدث', 'التصنيف']}
        rows={SEED_LOG.map((l, i) => ({
          key: i,
          cells: [
            <span className="text-[10px] font-bold text-jadeed-muted">{l.time}</span>,
            <span className="font-extrabold">{l.actor}</span>,
            <span className="text-jadeed-muted">{l.action}</span>,
            <ABadge tone={TONE[l.tone]}>
              {l.tone === 'ok' ? 'موافقة' : l.tone === 'warn' ? 'استرجاع' : l.tone === 'err' ? 'إخفاء' : 'نظام'}
            </ABadge>,
          ],
        }))}
      />
      <p className="mt-3 text-[10px] text-jadeed-ghost">يُحفظ السجل ٩٠ يومًا ثم يُؤرشف — التصدير متاح لصلاحية «مدير عام» فقط</p>
    </APage>
  )
}
