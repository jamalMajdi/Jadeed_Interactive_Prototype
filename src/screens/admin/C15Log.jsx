import { APage, ATable, ABadge } from '../../ui/ashell.jsx'
import { useAStore } from '../../ui/astore.jsx'
import { SEED_LOG } from '../../data/admin.js'

const TONE = { ok: 'ok', warn: 'warn', err: 'err', info: 'gray' }
const TONE_LABEL = { ok: 'موافقة', warn: 'استرجاع', err: 'رفض/حظر', info: 'نظام' }

const HEAD = ['الوقت', 'المستخدم', 'الحدث', 'التصنيف']

/* C-15 — سجل النشاط (Audit/Activity Log):
   قِيَم قرارات هذه الجلسة الحية (Record Audit Log — ACT_ManageUsers · ACT_VerifyMerchants · act_reviewStoreRequests)
   فوق سجل مستودع النظام الثابت */
export default function C15() {
  const { log } = useAStore()
  const live = [...log].reverse()

  return (
    <APage
      title="سجل النشاط"
      sub="كل عملية إدارية مسجلة بلا استثناء — غير قابل للتعديل أو الحذف"
      actions={
        <>
          {log.length > 0 && <ABadge tone="orange">مباشر — {log.length} قرارًا هذه الجلسة</ABadge>}
          <ABadge tone="gray">آخر ٢٤ ساعة</ABadge>
        </>
      }
    >
      {live.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 flex items-center gap-1.5 text-[11px] font-extrabold text-jadeed-orange">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-jadeed-orange" /> قرارات هذه الجلسة — تُكتب لحظيًا باسم المشرف
          </p>
          <ATable
            head={HEAD}
            rows={live.map((l, i) => ({
              key: 'live-' + i,
              cells: [
                <span className="text-[10px] font-bold text-jadeed-orange">{l.time}</span>,
                <span className="font-extrabold">{l.actor}</span>,
                <span className="text-jadeed-muted">{l.action}</span>,
                <ABadge tone={TONE[l.tone] || 'gray'}>{TONE_LABEL[l.tone] || 'نظام'}</ABadge>,
              ],
            }))}
          />
        </div>
      )}

      <p className="mb-2 text-[11px] font-extrabold text-jadeed-muted">سجل مستودع النظام (مستخرج)</p>
      <ATable
        head={HEAD}
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
