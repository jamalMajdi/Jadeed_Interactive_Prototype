import { useState } from 'react'
import { ShieldAlert, UserCheck, X } from 'lucide-react'
import { APage, ABadge } from '../../ui/ashell.jsx'
import { useNav } from '../../ui/nav.jsx'
import { useAStore } from '../../ui/astore.jsx'
import { MOD_ROLE_OPTIONS, SEED_MODERATORS, SEED_USERS } from '../../data/admin.js'

/* C-14 — إدارة أدوار المشرفين — دورة كاملة وفق ACT/SEQ_ManageModeratorRoles:
   تحقق صلاحية → عرض المشرفين الحاليين + المؤهلين → تعيين/تعديل/سحب (أدوار متعددة) → تأكيد → تحديث + إشعار
   (مصفوفة الصلاحيات التفصيلية تبقى مؤجلة — Gap-07) */
export default function C14() {
  const { go } = useNav()
  const { toast } = useAStore()
  const [mods, setMods] = useState(SEED_MODERATORS)
  const [action, setAction] = useState('assign') // assign | update | revoke
  const [selName, setSelName] = useState('')
  const [selRoles, setSelRoles] = useState([]) // selectedRoles — متعددة (SEQ: submitRoleChange(actionType, targetUserId, selectedRoles))
  const [confirming, setConfirming] = useState(false)
  const [failSim, setFailSim] = useState(false) // محاكاة فشل التحديث — [Update failed] الأدوار تبقى دون تغيير

  const eligible = SEED_USERS.filter((u) => u.status === 'active')

  const toggleRole = (r) => setSelRoles((p) => (p.includes(r) ? p.filter((x) => x !== r) : [...p, r]))

  const validate = () => {
    /* validateRoleChangeRequest — [Invalid request] */
    if (!selName) return 'اختر المستخدم المستهدف أولًا'
    if (action !== 'revoke' && selRoles.length === 0) return 'حدد دورًا واحدًا على الأقل (الأدوار متعددة)'
    if (action === 'assign' && mods.some((m) => m.name === selName)) return '«' + selName + '» مشرف بالفعل — استخدم «تعديل الأدوار»'
    if ((action === 'update' || action === 'revoke') && !mods.some((m) => m.name === selName)) return '«' + selName + '» ليس في قائمة المشرفين الحاليين'
    return null
  }

  const apply = () => {
    if (failSim) {
      /* [Update failed] — Display Error Message (Keep roles unchanged) */
      toast('فشل التحديث (محاكاة خطأ شبكة) — بقييت الأدوار دون تغيير', 'err')
      setConfirming(false)
      return
    }
    setMods((p) => {
      if (action === 'assign') return [...p, { id: 'm' + Date.now(), name: selName, email: '—', roles: [...selRoles], since: 'الآن' }]
      if (action === 'update') return p.map((m) => (m.name === selName ? { ...m, roles: [...selRoles] } : m))
      return p.filter((m) => m.name !== selName)
    })
    /* Synchronize Data & Send Success Notification */
    const verb = action === 'assign' ? 'عيّن' : action === 'update' ? 'حدّث أدوار' : 'سحب أدوار'
    toast(`${verb} «${selName}» ✓${action !== 'revoke' ? ' — ' + selRoles.join(' + ') : ''} — أُشعر المستخدم بالإسناد`, 'ok')
    setConfirming(false)
    setSelName('')
    setSelRoles([])
  }

  const invalid = confirming ? validate() : null

  return (
    <div className="relative min-h-full">
      <APage
        title="إدارة أدوار المشرفين"
        sub="تعيين وتعديل وسحب أدوار المشرفين — كل تغيير بتأكيد ويسجل في C-15"
        actions={
          <>
            <button
              onClick={() => go('c16')}
              title="محاكاة [Not authorized] → شاشة 403"
              className="flex items-center gap-1.5 rounded-xl border border-jadeed-line bg-white px-3 py-2 text-[11px] font-extrabold text-jadeed-muted transition hover:text-jadeed-red"
            >
              <ShieldAlert size={13} /> محاكاة وصول غير مصرح
            </button>
            <button
              onClick={() => setFailSim((v) => !v)}
              className={`rounded-xl px-3 py-2 text-[11px] font-extrabold transition ${failSim ? 'bg-jadeed-red text-white' : 'border border-jadeed-line bg-white text-jadeed-muted hover:text-jadeed-red'}`}
            >
              {failSim ? 'محاكاة الفشل: مفعّلة' : 'محاكاة فشل تحديث'}
            </button>
          </>
        }
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {/* المشرفون الحاليون — [No data] → حالة فارغة */}
          <div className="rounded-2xl border border-jadeed-line bg-white p-4 shadow-soft">
            <p className="text-xs font-extrabold">المشرفون الحاليون ({mods.length})</p>
            {mods.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-jadeed-line bg-jadeed-bg p-6 text-center">
                <UserCheck size={26} className="mx-auto text-jadeed-ghost" />
                <p className="mt-2 text-xs font-extrabold">لا مشرفين معيّنين حاليًا</p>
                <p className="mt-0.5 text-[11px] text-jadeed-muted">عيّن أول مشرف من قائمة المستخدمين المؤهلين (حالة فارغة — SEQ)</p>
              </div>
            ) : (
              <div className="mt-3 space-y-2">
                {mods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setSelName(m.name); setAction('update'); setSelRoles([...m.roles]) }}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl border-2 p-3 text-start transition ${selName === m.name ? 'border-jadeed-purple bg-jadeed-tint' : 'border-jadeed-line hover:bg-jadeed-bg'}`}
                  >
                    <span>
                      <span className="block text-xs font-extrabold">{m.name}</span>
                      <span className="block text-[10px] text-jadeed-muted">{m.email} · منذ {m.since}</span>
                    </span>
                    <span className="flex flex-wrap justify-end gap-1">
                      {m.roles.map((r) => <ABadge key={r} tone="purple">{r}</ABadge>)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* نموذج الإجراء */}
          <div className="rounded-2xl border border-jadeed-line bg-white p-4 shadow-soft">
            <p className="text-xs font-extrabold">إجراء الدور (submitRoleChange)</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[['assign', 'تعيين مشرف'], ['update', 'تعديل الأدوار'], ['revoke', 'سحب الأدوار']].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setAction(id)}
                  className={`rounded-xl border-2 py-2.5 text-[11px] font-extrabold transition ${action === id ? 'border-jadeed-purple bg-jadeed-tint text-jadeed-purple' : 'border-jadeed-line text-jadeed-muted hover:bg-jadeed-bg'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <p className="mb-1.5 mt-4 text-[11px] font-extrabold">المستخدم المستهدف (من المؤهلين — نشط)</p>
            <div className="flex flex-wrap gap-1.5">
              {eligible.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelName(u.name)}
                  className={`rounded-full border px-2.5 py-1.5 text-[10px] font-extrabold transition ${selName === u.name ? 'border-jadeed-purple bg-jadeed-tint text-jadeed-purple' : 'border-jadeed-line text-jadeed-muted hover:text-jadeed-purple'}`}
                >
                  {u.name} <span className="font-normal text-jadeed-ghost">· {u.type}</span>
                </button>
              ))}
            </div>

            {action !== 'revoke' && (
              <>
                <p className="mb-1.5 mt-4 text-[11px] font-extrabold">الأدوار (اختيار متعدد — selectedRoles)</p>
                <div className="flex flex-wrap gap-1.5">
                  {MOD_ROLE_OPTIONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => toggleRole(r)}
                      className={`rounded-full border px-3 py-1.5 text-[10px] font-extrabold transition ${selRoles.includes(r) ? 'border-jadeed-purple bg-jadeed-purple text-white' : 'border-jadeed-line text-jadeed-muted hover:text-jadeed-purple'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              onClick={() => setConfirming(true)}
              className="mt-5 w-full rounded-2xl bg-jadeed-orange py-3 text-xs font-extrabold text-white shadow-pop transition hover:bg-jadeed-orange-light"
            >
              حفظ التغييرات — Display Confirmation Dialog
            </button>
          </div>
        </div>

        <p className="mt-3 rounded-xl bg-jadeed-yellow-tint px-3.5 py-2.5 text-[11px] leading-5 text-jadeed-yellow-dark">
          إدارة التعيين/السحب مفعّلة وفق ACT/SEQ_ManageModeratorRoles — بينما مصفوفة الصلاحيات التفصيلية لكل دور ما تزال مؤجلة (Gap-07 في حزمة V3).
        </p>
      </APage>

      {/* Display Confirmation Dialog → Confirm / Cancel */}
      {confirming && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-jadeed-black/45 p-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-phone">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-extrabold">تأكيد تغيير الأدوار</h3>
                <p className="mt-1 text-[11px] leading-5 text-jadeed-muted">
                  {action === 'assign' && <>تعيين <b>{selName}</b> مشرفًا بأدوار: <b>{selRoles.join(' + ')}</b></>}
                  {action === 'update' && <>تحديث أدوار <b>{selName}</b> إلى: <b>{selRoles.join(' + ')}</b></>}
                  {action === 'revoke' && <>سحب كل الأدوار من <b>{selName}</b> وإزالته من قائمة المشرفين</>}
                </p>
              </div>
              <button onClick={() => setConfirming(false)} className="rounded-lg p-1.5 text-jadeed-ghost transition hover:bg-jadeed-bg">
                <X size={15} strokeWidth={2.4} />
              </button>
            </div>
            {invalid ? (
              <p className="mt-3 rounded-xl bg-jadeed-red-tint px-3 py-2 text-[11px] font-bold text-jadeed-red">
                طلب غير صالح: {invalid} — [Invalid request]
              </p>
            ) : (
              <p className="mt-3 rounded-xl bg-jadeed-bg px-3 py-2 text-[11px] font-bold text-jadeed-muted">
                سيُحدّث سجل الأدوار في قاعدة البيانات ويُسجل الإجراء في سجل النشاط (C-15).
              </p>
            )}
            <div className="mt-4 flex gap-2.5">
              <button
                onClick={() => { setConfirming(false); toast('أُلغي التغيير — لم يُعدّل شيء (Display Cancellation)', 'info') }}
                className="w-1/3 rounded-2xl border border-jadeed-line py-3 text-xs font-extrabold text-jadeed-muted transition hover:bg-jadeed-bg"
              >
                إلغاء
              </button>
              <button
                disabled={!!invalid}
                onClick={apply}
                className={`w-2/3 rounded-2xl py-3 text-xs font-extrabold text-white transition ${invalid ? 'bg-jadeed-gray text-jadeed-ghost' : 'bg-jadeed-purple hover:bg-jadeed-purple-light'}`}
              >
                تأكيد وتحديث الأدوار
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
