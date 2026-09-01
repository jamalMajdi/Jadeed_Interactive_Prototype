import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Menu,
  Monitor,
  Search,
  Store,
  User,
  X,
} from "lucide-react";
import { NavCtx } from "./ui/nav.jsx";
import { SCREENS, GROUPS } from "./ui/registry.jsx";
import { MERCHANT_SCREENS, MERCHANT_GROUPS } from "./ui/registry_m.jsx";
import { ADMIN_SCREENS, ADMIN_GROUPS } from "./ui/registry_a.jsx";
import { MStoreProvider, ToastHost } from "./ui/mstore.jsx";
import { AStoreProvider, AToastHost } from "./ui/astore.jsx";
import { AdminShell } from "./ui/ashell.jsx";
import { Logo } from "./ui/kit.jsx";

/* خريطة الشاشة الحالية → عنصر التنقل النشط في سايدبار الإدارة */
const ADMIN_ACTIVE = {
  c03: "c03",
  c03e: "c03",
  c17: "c03",
  c04: "c03",
  c05: "c05",
  c05e: "c05",
  c06: "c05",
  c07: "c07",
  c07e: "c07",
  c08: "c07",
  c09: "c09",
  c10: "c10",
  c11: "c10",
  c12: "c12",
  c12e: "c12",
  c13: "c12",
  c18: "c18",
  c19: "c19",
  c14: "c14",
  c15: "c15",
};

/* ── مقاسات إطار الهاتف الكاملة (شاشة 390×844 + إطار 11px) ── */
const FRAME_W = 414;
const FRAME_H = 868;

const APPS = [
  {
    id: "cust",
    name: "تطبيق العميل",
    short: "العميل",
    hint: "A-01…A-18",
    Icon: User,
    accent: "bg-jadeed-orange",
    def: "a06",
    groups: GROUPS,
    screens: SCREENS,
  },
  {
    id: "mer",
    name: "تطبيق التاجر",
    short: "التاجر",
    hint: "B-01…B-19",
    Icon: Store,
    accent: "bg-jadeed-purple-light",
    def: "b07",
    groups: MERCHANT_GROUPS,
    screens: MERCHANT_SCREENS,
  },
  {
    id: "adm",
    name: "لوحة الإدارة",
    short: "الإدارة",
    hint: "C-01…C-19",
    Icon: Monitor,
    accent: "bg-jadeed-black",
    def: "c03",
    groups: ADMIN_GROUPS,
    screens: ADMIN_SCREENS,
    desktop: true,
  },
];
const ALL_SCREENS = APPS.flatMap((a) => a.screens);

/* ── تصغير تلقائي للهاتف (ResizeObserver) ── */
function DeviceStage({ children }) {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const s = Math.min((r.width - 8) / FRAME_W, (r.height - 8) / FRAME_H, 1);
      setScale(Math.max(s, 0.35));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className="flex min-h-0 grow items-center justify-center overflow-hidden p-3 sm:p-5"
    >
      <div
        className="relative"
        style={{ width: FRAME_W * scale, height: FRAME_H * scale }}
      >
        <div
          className="absolute left-0 top-0"
          style={{
            width: FRAME_W,
            height: FRAME_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── مسرح سطح المكتب للإدارة — عرض كامل مرن بلا إطار هاتف ── */
function AdminStage({ children }) {
  return (
    <div className="flex min-h-0 grow flex-col p-3 sm:p-5">
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        className="relative mx-auto flex h-full w-full max-w-[1280px] grow flex-col overflow-hidden rounded-3xl bg-white shadow-phone ring-1 ring-jadeed-line 2xl:max-w-[1680px]"
      >
        {children}
        <AToastHost />
      </motion.div>
    </div>
  );
}

/* ── شجرة مجموعة (جذور + حالات فرعية) ── */
function GroupTree({ g, items, curKey, go }) {
  const roots = items.filter((s) => !s.parent);
  const groupOn = items.some((s) => s.key === curKey);
  return (
    <div className="mb-2.5">
      <div className="flex items-center justify-between px-2 pb-1 pt-1.5">
        <p
          className={`text-[11px] font-extrabold ${groupOn ? "text-[#c9a8ff]" : "text-white/70"}`}
        >
          {g.name}
        </p>
        <span
          className={`rounded-md px-1.5 text-[10px] font-bold ${groupOn ? "bg-jadeed-purple/40 text-[#c9a8ff]" : "bg-white/10 text-white/40"}`}
        >
          {items.length}
        </span>
      </div>
      <div className="space-y-0.5">
        {roots.map((s) => {
          const subs = items.filter((x) => x.parent === s.key);
          const on = s.key === curKey;
          return (
            <div key={s.key}>
              <button
                onClick={() => go(s.key)}
                className={`group flex w-full items-center gap-2 rounded-xl px-3 py-2 text-start transition ${on ? "bg-jadeed-purple/30 ring-1 ring-jadeed-purple-light/40" : "hover:bg-white/5"}`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${on ? "bg-jadeed-orange" : "bg-white/15 group-hover:bg-white/30"}`}
                />
                <span
                  className={`shrink-0 font-mono text-[10px] ${on ? "text-[#c9a8ff]" : "text-white/35"}`}
                  dir="ltr"
                >
                  {s.id}
                </span>
                <span
                  className={`truncate text-xs ${on ? "font-extrabold text-white" : "font-bold text-white/70"}`}
                >
                  {s.title}
                </span>
                {s.badge && (
                  <span className="shrink-0 rounded-md bg-jadeed-orange/90 px-1.5 py-px text-[9px] font-extrabold text-white">
                    {s.badge}
                  </span>
                )}
                {s.star && (
                  <span
                    className="shrink-0 text-[10px] text-jadeed-yellow"
                    title="الشاشة المعيارية"
                  >
                    ★
                  </span>
                )}
                {subs.length > 0 && (
                  <span className="ms-auto shrink-0 rounded-md bg-white/10 px-1.5 text-[9px] font-bold text-white/40">
                    +{subs.length} حالات
                  </span>
                )}
              </button>
              {subs.length > 0 && (
                <div className="ms-5 space-y-0.5 border-s-2 border-white/10 py-0.5 ps-2.5">
                  {subs.map((sub) => {
                    const onS = sub.key === curKey;
                    return (
                      <button
                        key={sub.key}
                        onClick={() => go(sub.key)}
                        className={`group flex w-full items-center gap-2 rounded-lg py-1.5 pe-2 ps-3 text-start transition ${onS ? "bg-jadeed-purple/25 ring-1 ring-jadeed-purple-light/30" : "hover:bg-white/5"}`}
                      >
                        <span
                          className={`font-mono text-[9px] ${onS ? "text-[#c9a8ff]" : "text-white/30"}`}
                          dir="ltr"
                        >
                          {sub.id}
                        </span>
                        <span
                          className={`truncate text-[11px] ${onS ? "font-extrabold text-white" : "font-bold text-white/50 group-hover:text-white/75"}`}
                        >
                          {sub.title}
                        </span>
                        {sub.badge && (
                          <span className="shrink-0 rounded-md bg-jadeed-orange/80 px-1 py-px text-[8px] font-extrabold text-white">
                            {sub.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [key, setKey] = useState("a06");
  const [q, setQ] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRow, setIsRow] = useState(false);
  const [md, setMd] = useState(false);
  const [xl, setXl] = useState(false);

  /* تتبع وضع التخطيط (صف/عمود) وحدود md/xl — لتحريك عرض السايدبار بالقيم الصحيحة */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const row = window.matchMedia("(min-width: 640px)");
    const mid = window.matchMedia("(min-width: 768px)");
    const wide = window.matchMedia("(min-width: 1280px)");
    const sync = () => {
      const rowOn = row.matches;
      setIsRow(rowOn);
      setMd(mid.matches);
      setXl(wide.matches);
      if (rowOn) setMobileMenuOpen(false);
    };
    sync();
    row.addEventListener("change", sync);
    mid.addEventListener("change", sync);
    wide.addEventListener("change", sync);
    return () => {
      row.removeEventListener("change", sync);
      mid.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
    };
  }, []);

  const SIDEBAR_W = xl ? 320 : md ? 288 : 256;

  const go = (k) => {
    setKey(k);
    setMobileMenuOpen(false);
  };
  const idx = ALL_SCREENS.findIndex((s) => s.key === key);
  const cur = ALL_SCREENS[idx];
  const curApp = APPS.find((a) => a.screens.includes(cur));
  const tab = curApp.id;
  const group = curApp.groups.find((g) => g.id === cur.group);

  /* البحث داخل التطبيق النشط فقط */
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return null;
    return curApp.screens.filter((s) =>
      `${s.id} ${s.title}`.toLowerCase().includes(t),
    );
  }, [q, curApp]);

  const step = (d) =>
    setKey(
      ALL_SCREENS[(idx + d + ALL_SCREENS.length) % ALL_SCREENS.length].key,
    );

  useLayoutEffect(() => {
    const h = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;
      if (e.key === "ArrowLeft") step(1);
      if (e.key === "ArrowRight") step(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [idx]);

  const Comp = cur.Comp;

  return (
    <NavCtx.Provider value={{ current: cur, go, list: ALL_SCREENS }}>
      {/* مخازن الحالة على مستوى الجذر — بيانات التاجر والإدارة لا تُفقد بين الشاشات */}
      <AStoreProvider>
        <MStoreProvider>
          <div className="flex h-screen flex-col overflow-hidden bg-jadeed-bg font-tajawal text-jadeed-black sm:flex-row">
            <AnimatePresence>
              {!isRow && mobileMenuOpen && (
                <>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="إغلاق القائمة"
                    className="fixed inset-0 z-30 bg-jadeed-black/45 backdrop-blur-[1px]"
                  />

                  <motion.aside
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 320, damping: 34 }}
                    className="fixed inset-y-0 right-0 z-40 w-[82%] max-w-[320px] overflow-hidden bg-[#17141F] text-white shadow-phone"
                  >
                    <div className="flex h-full w-full flex-col bg-[#17141F]">
                      <div className="flex items-center gap-3 px-5 pb-2 pt-4">
                        <div className="rounded-2xl bg-white/10 p-1.5 ring-1 ring-white/10">
                          <Logo size={28} />
                        </div>
                        <div className="min-w-0 grow">
                          <p className="text-sm font-extrabold leading-5">
                            جديد · النموذج التفاعلي
                          </p>
                          <p className="text-[10px] text-white/45">
                            عميل + تاجر + إدارة — Workbench شامل
                          </p>
                        </div>
                        <button
                          onClick={() => setMobileMenuOpen(false)}
                          title="إغلاق القائمة"
                          className="shrink-0 rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 px-4 pb-2 pt-1">
                        {APPS.map((a) => {
                          const on = a.id === tab;
                          return (
                            <button
                              key={a.id}
                              onClick={() => go(a.def)}
                              className={`flex flex-col items-center gap-1 rounded-2xl border py-2.5 transition ${on ? "border-jadeed-purple-light/50 bg-jadeed-purple/30 shadow-pop" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                            >
                              <span
                                className={`flex h-8 w-8 items-center justify-center rounded-xl text-white ${on ? a.accent : "bg-white/10"}`}
                              >
                                <a.Icon size={15} />
                              </span>
                              <span
                                className={`text-[10px] ${on ? "font-extrabold text-white" : "font-bold text-white/50"}`}
                              >
                                {a.short}
                              </span>
                              <span
                                className="font-mono text-[8px] text-white/30"
                                dir="ltr"
                              >
                                {a.hint}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="px-4 pb-1.5">
                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-jadeed-purple-light">
                          <Search size={15} className="text-white/35" />
                          <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="ابحث في هذه اللوحة…"
                            className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/30"
                          />
                          <span className="shrink-0 rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white/50">
                            {filtered ? filtered.length : curApp.screens.length}
                            /{curApp.screens.length}
                          </span>
                        </div>
                      </div>

                      <div className="side-scroll min-h-0 grow overflow-y-auto px-3 pb-2">
                        {curApp.groups.map((g) => {
                          const items = filtered
                            ? filtered.filter((s) => s.group === g.id)
                            : curApp.screens.filter((s) => s.group === g.id);
                          if (!items.length) return null;
                          return (
                            <GroupTree
                              key={g.id}
                              g={g}
                              items={items}
                              curKey={key}
                              go={go}
                            />
                          );
                        })}
                        {filtered && filtered.length === 0 && (
                          <p className="px-3 py-6 text-center text-xs text-white/40">
                            لا نتائج في هذه اللوحة
                          </p>
                        )}
                      </div>

                      <div className="border-t border-white/10 px-5 py-2.5 text-[10px] leading-4 text-white/35">
                        ٨٥ إدخالًا = ٣٤ عميل + ٢٩ تاجر + ٢٢ إدارة · مطابق لجرد
                        V3
                      </div>
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>

            {isRow && (
              <motion.aside
                initial={false}
                animate={{ width: collapsed ? 0 : SIDEBAR_W }}
                transition={{ type: "spring", stiffness: 320, damping: 34 }}
                className="relative h-[44vh] shrink-0 overflow-hidden bg-[#17141F] text-white sm:sticky sm:top-0 sm:h-screen"
              >
                <motion.div
                  initial={false}
                  animate={{ opacity: collapsed ? 0 : 1 }}
                  transition={{ duration: 0.18 }}
                  className="flex h-full w-64 flex-col bg-[#17141F] md:w-72 xl:w-80"
                >
                  <div className="flex items-center gap-3 px-5 pb-2 pt-4">
                    <div className="rounded-2xl bg-white/10 p-1.5 ring-1 ring-white/10">
                      <Logo size={28} />
                    </div>
                    <div className="min-w-0 grow">
                      <p className="text-sm font-extrabold leading-5">
                        جديد · النموذج التفاعلي
                      </p>
                      <p className="text-[10px] text-white/45">
                        عميل + تاجر + إدارة — Workbench شامل
                      </p>
                    </div>
                    <span className="rounded-lg bg-jadeed-orange px-2 py-1 text-[10px] font-extrabold">
                      V3
                    </span>
                    <button
                      onClick={() => setCollapsed(true)}
                      title="طي القائمة"
                      className="hidden shrink-0 rounded-lg p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white sm:block"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 px-4 pb-2 pt-1">
                    {APPS.map((a) => {
                      const on = a.id === tab;
                      return (
                        <button
                          key={a.id}
                          onClick={() => go(a.def)}
                          className={`flex flex-col items-center gap-1 rounded-2xl border py-2.5 transition ${on ? "border-jadeed-purple-light/50 bg-jadeed-purple/30 shadow-pop" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                        >
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-xl text-white ${on ? a.accent : "bg-white/10"}`}
                          >
                            <a.Icon size={15} />
                          </span>
                          <span
                            className={`text-[10px] ${on ? "font-extrabold text-white" : "font-bold text-white/50"}`}
                          >
                            {a.short}
                          </span>
                          <span
                            className="font-mono text-[8px] text-white/30"
                            dir="ltr"
                          >
                            {a.hint}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="px-4 pb-1.5">
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-jadeed-purple-light">
                      <Search size={15} className="text-white/35" />
                      <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="ابحث في هذه اللوحة…"
                        className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/30"
                      />
                      <span className="shrink-0 rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white/50">
                        {filtered ? filtered.length : curApp.screens.length}/
                        {curApp.screens.length}
                      </span>
                    </div>
                  </div>

                  <div className="side-scroll min-h-0 grow overflow-y-auto px-3 pb-2">
                    {curApp.groups.map((g) => {
                      const items = filtered
                        ? filtered.filter((s) => s.group === g.id)
                        : curApp.screens.filter((s) => s.group === g.id);
                      if (!items.length) return null;
                      return (
                        <GroupTree
                          key={g.id}
                          g={g}
                          items={items}
                          curKey={key}
                          go={go}
                        />
                      );
                    })}
                    {filtered && filtered.length === 0 && (
                      <p className="px-3 py-6 text-center text-xs text-white/40">
                        لا نتائج في هذه اللوحة
                      </p>
                    )}
                  </div>

                  <div className="border-t border-white/10 px-5 py-2.5 text-[10px] leading-4 text-white/35">
                    ٨٥ إدخالًا = ٣٤ عميل + ٢٩ تاجر + ٢٢ إدارة · مطابق لجرد V3
                  </div>
                </motion.div>
              </motion.aside>
            )}

            {/* ═══ منطقة المعاينة — تملأ الباقي في العمود والصف معًا (بلا h-screen مزدوج) ═══ */}
            <main
              className="flex min-h-0 min-w-0 grow flex-col overflow-hidden"
              style={{
                backgroundImage:
                  "radial-gradient(1100px 520px at 78% -8%, rgba(125,34,255,.13), transparent), radial-gradient(900px 480px at 8% 108%, rgba(255,87,21,.09), transparent)",
              }}
            >
              <header className="z-20 flex h-11 shrink-0 items-center justify-between gap-3 border-b border-jadeed-line bg-white/80 px-4 backdrop-blur">
                <div className="flex min-w-0 items-center gap-2.5">
                  {!isRow && (
                    <button
                      onClick={() => setMobileMenuOpen(true)}
                      title="فتح القائمة"
                      className="shrink-0 rounded-lg border border-jadeed-line bg-white p-1.5 shadow-soft transition hover:text-jadeed-purple"
                    >
                      <Menu size={15} />
                    </button>
                  )}

                  <AnimatePresence>
                    {collapsed && isRow && (
                      <motion.button
                        key="expand-sidebar"
                        initial={{ opacity: 0, scale: 0.6, x: 8 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 26,
                        }}
                        onClick={() => setCollapsed(false)}
                        title="فتح القائمة"
                        className="shrink-0 rounded-lg border border-jadeed-line bg-white p-1.5 shadow-soft transition hover:text-jadeed-purple"
                      >
                        <ChevronLeft size={15} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                  <span
                    className={`shrink-0 rounded-lg px-2 py-0.5 font-mono text-[11px] font-bold text-white ${curApp.desktop ? "bg-jadeed-black" : curApp.id === "cust" ? "bg-jadeed-purple" : "bg-jadeed-purple-deep"}`}
                    dir="ltr"
                    title={`${curApp.name} — ${group.refs}`}
                  >
                    {cur.id}
                  </span>
                  <p className="flex min-w-0 items-center gap-1.5 truncate text-[13px] font-extrabold">
                    <span className="truncate">{cur.title}</span>
                    {cur.badge && (
                      <span className="shrink-0 rounded-md bg-jadeed-orange px-1.5 py-px text-[9px] font-extrabold text-white">
                        {cur.badge}
                      </span>
                    )}
                    {cur.star && (
                      <span className="shrink-0 rounded-md bg-jadeed-tint px-1.5 py-px text-[9px] font-extrabold text-jadeed-purple">
                        ★ المعيار
                      </span>
                    )}
                    {curApp.desktop && (
                      <span className="hidden shrink-0 rounded-md bg-jadeed-gray px-1.5 py-px text-[9px] font-extrabold text-jadeed-muted sm:block">
                        عرض سطح مكتب
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <span
                    className="mx-1 hidden text-[11px] font-bold text-jadeed-muted sm:block"
                    dir="ltr"
                  >
                    {idx + 1} / {ALL_SCREENS.length}
                  </span>
                  <button
                    onClick={() => step(1)}
                    title="السابق (→)"
                    className="rounded-lg border border-jadeed-line bg-white p-1.5 shadow-soft transition hover:text-jadeed-purple"
                  >
                    <ChevronRight size={15} />
                  </button>
                  <button
                    onClick={() => step(-1)}
                    title="التالي (←)"
                    className="rounded-lg border border-jadeed-line bg-white p-1.5 shadow-soft transition hover:text-jadeed-purple"
                  >
                    <ChevronLeft size={15} />
                  </button>
                </div>
              </header>

              {curApp.desktop ? (
                /* ═══ الإدارة: نافذة سطح مكتب كاملة ═══ */
                <AdminStage>
                  <AdminShell active={ADMIN_ACTIVE[cur.key] || ""}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={cur.key}
                        className="h-full w-full"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Comp />
                      </motion.div>
                    </AnimatePresence>
                  </AdminShell>
                </AdminStage>
              ) : (
                /* ═══ العميل/التاجر: إطار الهاتف ═══ */
                <DeviceStage>
                  <motion.div
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 24 }}
                    className="relative h-full w-full rounded-[56px] bg-[#141219] p-[11px] shadow-phone ring-1 ring-white/10"
                  >
                    <div className="absolute -left-[2px] top-44 h-16 w-[3px] rounded-full bg-[#2a2634]" />
                    <div className="absolute -right-[2px] top-40 h-10 w-[3px] rounded-full bg-[#2a2634]" />
                    <div className="absolute -right-[2px] top-56 h-14 w-[3px] rounded-full bg-[#2a2634]" />

                    <div className="relative h-[844px] w-[390px] overflow-hidden rounded-[46px] bg-white">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={cur.key}
                          className="h-full w-full"
                          initial={{ opacity: 0, x: -26, scale: 0.985 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 26, scale: 0.985 }}
                          transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 28,
                          }}
                        >
                          <Comp />
                        </motion.div>
                      </AnimatePresence>
                      <ToastHost />
                      <div className="pointer-events-none absolute left-1/2 top-[10px] z-40 h-[26px] w-[110px] -translate-x-1/2 rounded-full bg-[#141219]" />
                    </div>
                  </motion.div>
                </DeviceStage>
              )}
            </main>
          </div>
        </MStoreProvider>
      </AStoreProvider>
    </NavCtx.Provider>
  );
}
