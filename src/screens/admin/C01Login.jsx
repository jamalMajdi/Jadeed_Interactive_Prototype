import { useState } from 'react'
import { KeyRound, Lock, ShieldAlert, XCircle } from 'lucide-react'
import { Logo } from '../../ui/kit.jsx'
import { useNav } from '../../ui/nav.jsx'
import { useAStore } from '../../ui/astore.jsx'
import { ADMINS } from '../../data/admin.js'
import { SEED_USERS } from '../../data/admin.js'

const MAX_ATTEMPTS = 3
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* C-01 — تسجيل دخول المشرف — آلة حالة كاملة وفق ACT/SEQ_AdminLogin:
   تحقق صيغة → تحقق بيانات (عدّاد محاولات + قفل مؤقت) → حالة الحساب → فحص الدور → جلسة → لوحة القيادة */
export default function C01() {
  const { go } = useNav()
  const { toast } = useAStore()
  const [email, setEmail] = useState('admin@jadeed.ye')
  const [pass, setPass] = useState('123456')
  const [err, setErr] = useState(null) // format | cred | locked | inactive | notadmin
  const [attempts, setAttempts] = useState(0)

  const locked = attempts >= MAX_ATTEMPTS

  const submit = () => {
    if (locked) return
    /* 1) Validate Input Format */
    if (!EMAIL_RE.test(email.trim())) return setErr('format')
    /* 2) Verify Credentials in DB */
    const acc = ADMINS.find((a) => a.email === email.trim().toLowerCase())
    if (!acc || acc.password !== pass) {
      const n = attempts + 1
      setAttempts(n)
      return setErr(n >= MAX_ATTEMPTS ? 'locked' : 'cred') // Increment Attempt Counter → [limit reached] Temporarily Lock
    }
    /* 3) Check Account Status */
    if (acc.status !== 'active') return setErr('inactive')
    /* 4) Check User Role — [Not Admin] لا يمر هنا لأن القائمة إدارية فقط، نحاكي بمستخدم من دليل العملاء */
    if (email.trim().toLowerCase() === 'sami@example.com') return setErr('notadmin')
    /* 5) Reset Attempt Counter → Create Session → Redirect */
    setErr(null)
    toast(`مرحبًا ${acc.name} — أُنشئت الجلسة بنجاح ✓`, 'ok')
    go('c03')
  }

  const BANNER = {
    format: { cls: 'bg-jadeed-red-tint text-jadeed-red', Icon: XCircle, msg: 'صيغة البريد الإلكتروني غير صحيحة — تحقق من الصيغة (name@example.com)' },
    cred: { cls: 'bg-jadeed-red-tint text-jadeed-red', Icon: XCircle, msg: `البريد الإلكتروني أو كلمة المرور غير صحيحة — تبقّت ${MAX_ATTEMPTS - attempts} محاولة قبل القفل المؤقت` },
    locked: { cls: 'bg-jadeed-red-tint text-jadeed-red', Icon: Lock, msg: 'تم تجاوز عدد المحاولات — قُفل الحساب مؤقتًا لمدة ١٥ دقيقة (ACT_AdminLogin)' },
    inactive: { cls: 'bg-jadeed-yellow-tint text-jadeed-yellow-dark', Icon: ShieldAlert, msg: 'هذا الحساب موقوف/غير نشط — راجع مدير عام (Account Disabled)' },
    notadmin: { cls: 'bg-jadeed-yellow-tint text-jadeed-yellow-dark', Icon: ShieldAlert, msg: 'غير مصرح: هذا الحساب ليس مشرفًا (Access Denied: Not an Admin)' },
  }[err]
  const BannerIcon = BANNER?.Icon

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-jadeed-purple via-[#5f0de0] to-jadeed-purple-light">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-jadeed-orange/20 blur-3xl" />

      <div className="relative w-full max-w-sm rounded-3xl bg-white p-7 shadow-phone">
        <div className="mb-5 flex items-center gap-3">
          <Logo size={38} />
          <div>
            <p className="text-sm font-extrabold">جديد · للإدارة</p>
            <p className="text-[10px] text-jadeed-muted">دخول مشرفي النظام فقط</p>
          </div>
        </div>

        {err && BANNER && (
          <div className={`mb-4 flex items-start gap-2 rounded-2xl p-3 text-[11px] leading-5 ${BANNER.cls}`}>
            <BannerIcon size={15} className="mt-0.5 shrink-0" />
            <span>{BANNER.msg}</span>
          </div>
        )}

        <label className="mb-3.5 block">
          <span className="mb-1 block text-[11px] font-bold">البريد الإداري</span>
          <input
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 text-left text-xs outline-none focus:border-jadeed-purple focus:bg-white"
          />
        </label>
        <label className="mb-4 block">
          <span className="mb-1 block text-[11px] font-bold">كلمة المرور</span>
          <div className="flex items-center gap-2 rounded-xl border border-jadeed-line bg-jadeed-bg px-3.5 py-3 focus-within:border-jadeed-purple focus-within:bg-white">
            <KeyRound size={14} className="text-jadeed-ghost" />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-transparent text-xs outline-none"
            />
          </div>
        </label>

        <button
          onClick={submit}
          disabled={locked}
          className={`w-full rounded-2xl py-3.5 text-sm font-extrabold transition ${locked ? 'bg-jadeed-gray text-jadeed-ghost' : 'bg-jadeed-orange text-white shadow-pop hover:bg-jadeed-orange-light active:scale-[.99]'}`}
        >
          <span className="inline-flex items-center gap-2"><Lock size={15} /> {locked ? 'الحساب مقفل مؤقتًا' : 'دخول لوحة الإدارة'}</span>
        </button>

        <div className="mt-4 rounded-xl bg-jadeed-tint px-3 py-2.5 text-[10px] leading-4 text-jadeed-purple">
          <b>حسابات تجريبية (كلمة المرور 123456):</b><br />
          admin@jadeed.ye — مدير عام (دخول ناجح) · salem@jadeed.ye — مشرف توثيق<br />
          reem@jadeed.ye — حساب موقوف · sami@example.com — غير مشرف (Access Denied)
        </div>
        <p className="mt-3 text-center text-[10px] leading-4 text-jadeed-ghost">
          الجلسات تُقفل تلقائيًا بعد ١٥ دقيقة خمول — كل عملية تُسجل في سجل النشاط (C-15)
        </p>
      </div>
    </div>
  )
}
