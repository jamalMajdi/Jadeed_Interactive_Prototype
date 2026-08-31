import { useState } from 'react'
import { Ban, CheckCircle2, X } from 'lucide-react'
import { APage } from '../../ui/ashell.jsx'
import { useNav } from '../../ui/nav.jsx'
import { useAStore } from '../../ui/astore.jsx'

const REASONS = ['إساءة استخدام نظام الإلغاء', 'طلبات وهمية متكررة', 'سلوك مسيء مع المتاجر', 'مخالفة سياسة الاستخدام']

/* C-08 — حوار حظر / رفع حظر (Confirm + سبب إلزامي) — منتقي مستخدم من C-07 */
export default function C08() {
  const { go } = useNav()
  const { users, blockUser, unblockUser } = useAStore()
  const [selId, setSelId] = useState((users.find((u) => u.status === 'blocked') || users[0]).id)
  const target = users.find((u) => u.id === selId) || users[0]
  const blocking = target?.status !== 'blocked'
  const [reason, setReason] = useState(REASONS[0])

  if (!target) return null

  return (
    <div className="relative min-h-full">
      <APage title="إدارة المستخدمين" sub="حوار الحظر يظهر فوق القائمة — القرار فوري ومسجل">
        <div className="mx-auto max-w-md" />
      </APage>

      {/* الحوار */}
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-jadeed-black/45 p-6 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-phone">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${blocking ? 'bg-jadeed-red-tint text-jadeed-red' : 'bg-jadeed-tint text-jadeed-purple'}`}>
                {blocking ? <Ban size={22} /> : <CheckCircle2 size={22} />}
              </span>
              <div>
                <h3 className="text-sm font-extrabold">{blocking ? `حظر «${target.name}»؟` : `رفع الحظر عن «${target.name}»؟`}</h3>
                <p className="mt-0.5 text-[11px] text-jadeed-muted">{target.type} · {target.orders} طلب سابق</p>
              </div>
            </div>
            <button onClick={() => go('c07')} className="rounded-lg p-1.5 text-jadeed-ghost transition hover:bg-jadeed-bg">
              <X size={15} strokeWidth={2.4} />
            </button>
          </div>

          {/* منتقي المستخدم — القرار ينطبق على المُحدد هنا */}
          <p className="mb-1.5 mt-4 text-[11px] font-extrabold">المستخدم المستهدف <span className="font-normal text-jadeed-ghost">(من قائمة C-07)</span></p>
          <div className="flex flex-wrap gap-1.5">
            {users.slice(0, 6).map((u) => {
              const on = u.id === selId
              return (
                <button
                  key={u.id}
                  onClick={() => setSelId(u.id)}
                  className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-extrabold transition ${on ? 'border-jadeed-purple bg-jadeed-tint text-jadeed-purple' : 'border-jadeed-line text-jadeed-muted hover:text-jadeed-purple'}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${u.status === 'blocked' ? 'bg-jadeed-red' : 'bg-jadeed-purple'}`} />
                  {u.name}
                  <span className="font-normal text-jadeed-ghost">· {u.type}</span>
                </button>
              )
            })}
          </div>

          {blocking && (
            <div className="mt-4">
              <p className="mb-2 text-[11px] font-extrabold">سبب الحظر <span className="text-jadeed-red">*</span> (إلزامي — يُرسل للمستخدم وينعكس في شاشة الحظر لديه A-17)</p>
              <div className="space-y-1.5">
                {REASONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setReason(r)}
                    className={`flex w-full items-center gap-2 rounded-xl border-2 p-2.5 text-start text-[11px] font-bold transition ${reason === r ? 'border-jadeed-red/50 bg-jadeed-red-tint text-jadeed-red' : 'border-jadeed-line hover:bg-jadeed-bg'}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${reason === r ? 'bg-jadeed-red' : 'bg-jadeed-line'}`} />
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}
          {!blocking && target.reason && (
            <p className="mt-4 rounded-xl bg-jadeed-bg px-3 py-2 text-[11px] font-bold text-jadeed-muted">حُظر سابقًا بسبب: {target.reason}</p>
          )}

          <div className="mt-5 flex gap-2.5">
            <button onClick={() => go('c07')} className="w-1/3 rounded-2xl border border-jadeed-line py-3 text-xs font-extrabold text-jadeed-muted transition hover:bg-jadeed-bg">
              تراجع
            </button>
            <button
              onClick={() => {
                if (blocking) blockUser(target.id, target.name, reason)
                else unblockUser(target.id, target.name)
                go('c07')
              }}
              className={`w-2/3 rounded-2xl py-3 text-xs font-extrabold text-white transition ${blocking ? 'bg-jadeed-red hover:opacity-90' : 'bg-jadeed-purple hover:bg-jadeed-purple-light'}`}
            >
              {blocking ? 'تأكيد الحظر وإشعار المستخدم' : 'تأكيد رفع الحظر'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
