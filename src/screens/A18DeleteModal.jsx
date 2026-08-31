import { useState } from 'react'
import { AlertTriangle, Check } from 'lucide-react'
import { Dialog, fadeUp } from '../ui/kit.jsx'
import { useNav } from '../ui/nav.jsx'
import { useMStore } from '../ui/mstore.jsx'
import A16 from './A16Account.jsx'

export default function A18() {
  const { go } = useNav()
  const { toast } = useMStore()
  const [ack, setAck] = useState(false)

  return (
    <div className="relative h-full">
      {/* حسابي خلف المودال */}
      <div className="pointer-events-none h-full">
        <A16 />
      </div>

      <Dialog>
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-jadeed-red-tint text-jadeed-red">
            <AlertTriangle size={24} />
          </span>
          <div>
            <h3 className="text-sm font-extrabold">حذف الحساب نهائيًا؟</h3>
            <p className="mt-1 text-[11px] leading-5 text-jadeed-muted">
              سيتم حذف حسابك وطلباتك وبياناتك <b className="text-jadeed-red">نهائيًا</b> وفق القرار DD-10. لا يمكن التراجع عن هذا الإجراء (A-18).
            </p>
          </div>
        </div>

        {/* إقرار المستخدم */}
        <button
          onClick={() => setAck((v) => !v)}
          className={`mt-4 flex w-full items-center gap-2.5 rounded-2xl border-2 p-3 text-start transition ${ack ? 'border-jadeed-red/50 bg-jadeed-red-tint' : 'border-jadeed-line bg-white'}`}
        >
          <span className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-md border-2 transition ${ack ? 'border-jadeed-red bg-jadeed-red text-white' : 'border-jadeed-line'}`}>
            {ack && <Check size={13} strokeWidth={3.5} />}
          </span>
          <span className="text-[11px] font-bold leading-5 text-jadeed-muted">
            أفهم أن هذا الإجراء <b className="text-jadeed-red">نهائي ولا يمكن التراجع عنه</b>
          </span>
        </button>

        <div className="mt-5 flex gap-2.5">
          <button
            onClick={() => go('a16')}
            className="w-1/3 rounded-2xl border border-jadeed-line py-3 text-xs font-extrabold text-jadeed-muted transition hover:bg-jadeed-bg"
          >
            تراجع
          </button>
          <button
            onClick={() => { toast('حُذف حسابك نهائيًا وفق DD-10 — تم إنهاء جلستك', 'info'); go('a01') }}
            disabled={!ack}
            className={`w-2/3 rounded-2xl py-3 text-xs font-extrabold transition ${ack ? 'bg-jadeed-red text-white shadow-pop hover:opacity-90' : 'bg-jadeed-gray text-jadeed-ghost'}`}
          >
            حذف نهائيًا
          </button>
        </div>
      </Dialog>
    </div>
  )
}
