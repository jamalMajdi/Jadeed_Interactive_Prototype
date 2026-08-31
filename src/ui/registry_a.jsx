import C01 from '../screens/admin/C01Login.jsx'
import C03 from '../screens/admin/C03Verify.jsx'
import C04 from '../screens/admin/C04VerifyDetail.jsx'
import C05 from '../screens/admin/C05StoreReq.jsx'
import C06 from '../screens/admin/C06StoreDetail.jsx'
import C07 from '../screens/admin/C07Users.jsx'
import C08 from '../screens/admin/C08Block.jsx'
import C09 from '../screens/admin/C09Merchants.jsx'
import C10 from '../screens/admin/C10Products.jsx'
import C11 from '../screens/admin/C11Review.jsx'
import C12 from '../screens/admin/C12Orders.jsx'
import C13 from '../screens/admin/C13Track.jsx'
import C14 from '../screens/admin/C14Roles.jsx'
import C15 from '../screens/admin/C15Log.jsx'
import C16 from '../screens/admin/C16Unauthorized.jsx'
import C18 from '../screens/admin/C18Categories.jsx'
import C19 from '../screens/admin/C19Banners.jsx'

/* مجموعات لوحة الإدارة + مراجع المصدر */
export const ADMIN_GROUPS = [
  { id: 'a-access', name: 'الدخول والحماية', refs: 'جلسات المشرفين · 403 Unauthorized' },
  { id: 'a-merchants', name: 'التجار والمتاجر', refs: 'verifyMerchant · State-Store_Creation_Request' },
  { id: 'a-users', name: 'المستخدمون', refs: 'blockUser · سبب إلزامي · sendNotification' },
  { id: 'a-content', name: 'المنتجات والمحتوى', refs: 'مراجعة المنتجات · DD-09 ★ C-18/C-19' },
  { id: 'a-ops', name: 'العمليات والحوكمة', refs: 'State-Order · Gap-07 · Audit Log' },
]

/* فهرس لوحة الإدارة — 17 شاشة رئيسية (C-01…C-19) + 5 حالات (فارغة/تحميل) = 22 إدخالًا (جرد V3) */
export const ADMIN_SCREENS = [
  /* الدخول والحماية */
  { key: 'c01', id: 'C-01', title: 'تسجيل دخول المشرف', group: 'a-access', Comp: C01 },
  { key: 'c16', id: 'C-16', title: 'وصول غير مصرح — 403', group: 'a-access', Comp: C16 },

  /* التجار والمتاجر */
  { key: 'c03', id: 'C-03', title: 'طلبات توثيق التجار', group: 'a-merchants', badge: 'V3', Comp: () => <C03 state="default" /> },
  { key: 'c03e', id: 'C-03', title: 'قائمة التوثيق — فارغة', group: 'a-merchants', parent: 'c03', Comp: () => <C03 state="empty" /> },
  { key: 'c17', id: 'C-17', title: 'حالة التحميل — Skeleton', group: 'a-merchants', parent: 'c03', Comp: () => <C03 state="loading" /> },
  { key: 'c04', id: 'C-04', title: 'تفاصيل طلب توثيق + القرار', group: 'a-merchants', Comp: C04 },
  { key: 'c05', id: 'C-05', title: 'طلبات إنشاء المتاجر', group: 'a-merchants', Comp: () => <C05 state="default" /> },
  { key: 'c05e', id: 'C-05', title: 'طلبات المتاجر — فارغة', group: 'a-merchants', parent: 'c05', Comp: () => <C05 state="empty" /> },
  { key: 'c06', id: 'C-06', title: 'تفاصيل طلب متجر + قبول/رفض', group: 'a-merchants', Comp: C06 },
  { key: 'c09', id: 'C-09', title: 'نظرة عامة على التجار', group: 'a-merchants', Comp: C09 },

  /* المستخدمون */
  { key: 'c07', id: 'C-07', title: 'إدارة المستخدمين — الكل', group: 'a-users', Comp: () => <C07 state="default" /> },
  { key: 'c07e', id: 'C-07', title: 'قائمة المستخدمين — فارغة', group: 'a-users', parent: 'c07', Comp: () => <C07 state="empty" /> },
  { key: 'c08', id: 'C-08', title: 'حوار حظر / رفع حظر', group: 'a-users', Comp: C08 },

  /* المنتجات والمحتوى */
  { key: 'c10', id: 'C-10', title: 'منتجات التجار حسب المتجر', group: 'a-content', Comp: C10 },
  { key: 'c11', id: 'C-11', title: 'مراجعة منتج — سبب إلزامي', group: 'a-content', badge: 'V3', Comp: C11 },
  { key: 'c18', id: 'C-18', title: 'إدارة الفئات ★', group: 'a-content', Comp: C18 },
  { key: 'c19', id: 'C-19', title: 'العروض والبنرات ★', group: 'a-content', Comp: C19 },

  /* العمليات والحوكمة */
  { key: 'c12', id: 'C-12', title: 'تتبع الطلبات — الجميع', group: 'a-ops', Comp: () => <C12 state="default" /> },
  { key: 'c12e', id: 'C-12', title: 'تتبع الطلبات — فارغ', group: 'a-ops', parent: 'c12', Comp: () => <C12 state="empty" /> },
  { key: 'c13', id: 'C-13', title: 'تفاصيل تتبع طلب', group: 'a-ops', Comp: C13 },
  { key: 'c14', id: 'C-14', title: 'أدوار المشرفين (Gap-07)', group: 'a-ops', Comp: C14 },
  { key: 'c15', id: 'C-15', title: 'سجل النشاط — Audit Log', group: 'a-ops', Comp: C15 },
]
