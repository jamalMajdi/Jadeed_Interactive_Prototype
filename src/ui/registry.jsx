import A01 from '../screens/A01Welcome.jsx'
import A02 from '../screens/A02Email.jsx'
import A03 from '../screens/A03Otp.jsx'
import A04 from '../screens/A04Profile.jsx'
import A05 from '../screens/A05Location.jsx'
import A06 from '../screens/A06Home.jsx'
import A07 from '../screens/A07Store.jsx'
import A08 from '../screens/A08Product.jsx'
import A09 from '../screens/A09Search.jsx'
import A09b from '../screens/A09bFilters.jsx'
import A10 from '../screens/A10Cart.jsx'
import A11 from '../screens/A11Checkout.jsx'
import A12 from '../screens/A12Success.jsx'
import A13 from '../screens/A13Orders.jsx'
import A14 from '../screens/A14Tracking.jsx'
import A15 from '../screens/A15Cancel.jsx'
import A16 from '../screens/A16Account.jsx'
import A17 from '../screens/A17Blocked.jsx'
import A18 from '../screens/A18DeleteModal.jsx'

/* مجموعات الرحلة + مراجع المصدر التحليلي */
export const GROUPS = [
  { id: 'auth', name: 'التسجيل والدخول', refs: 'UC-01 · UC-02 · ACT_Authentication' },
  { id: 'home', name: 'الرئيسية والتصفح', refs: 'UC-09 · ACT_BrowseNearbyStores · Sort By Distance' },
  { id: 'catalog', name: 'المنتج والبحث', refs: 'ACT_productBrowse · ACT_productDetails · ACT_SearchAdvanced' },
  { id: 'order', name: 'السلة والطلب', refs: 'State-Order · ACT_requestToCreateOrder · getSignature' },
  { id: 'account', name: 'الحساب والحماية', refs: 'sendNotification · DD-10 · حذف الحساب' },
]

/* فهرس شاشات تطبيق العميل — 18 شاشة رئيسية (A-01..A-18) + 16 حالة فرعية = 34 إدخالًا
   parent: مفتاح الشاشة الأم → تُعرض كحالة فرعية مزاحة تحتها في القائمة */
export const SCREENS = [
  /* التسجيل والدخول */
  { key: 'a01', id: 'A-01', title: 'الترحيب · اختيار نوع الحساب', group: 'auth', Comp: A01 },
  { key: 'a02', id: 'A-02', title: 'إدخال البريد الإلكتروني', group: 'auth', Comp: A02 },
  { key: 'a02e', id: 'A-02e', title: 'فشل إرسال OTP / خطأ الدخول', group: 'auth', parent: 'a02', badge: 'V3', Comp: () => <A02 state="error" /> },
  { key: 'a03', id: 'A-03', title: 'رمز التحقق OTP', group: 'auth', Comp: A03 },
  { key: 'a03e', id: 'A-03', title: 'رمز خاطئ · القفل المؤقت', group: 'auth', parent: 'a03', badge: 'V3', Comp: () => <A03 state="error" /> },
  { key: 'a04', id: 'A-04', title: 'إكمال البيانات الأساسية', group: 'auth', Comp: A04 },
  { key: 'a05', id: 'A-05', title: 'تحديد الموقع — GPS / خريطة', group: 'auth', Comp: () => <A05 state="gps" /> },
  { key: 'a05d', id: 'A-05', title: 'إذن مرفوض · إدخال يدوي', group: 'auth', parent: 'a05', Comp: () => <A05 state="denied" /> },

  /* الرئيسية والتصفح */
  { key: 'a06', id: 'A-06', title: 'الرئيسية — المتاجر القريبة', group: 'home', star: true, Comp: () => <A06 state="default" /> },
  { key: 'a06l', id: 'A-06L', title: 'هيكل تحميل Skeleton', group: 'home', parent: 'a06', badge: 'V3', Comp: () => <A06 state="skeleton" /> },
  { key: 'a06e', id: 'A-06', title: 'لا متاجر قريبة', group: 'home', parent: 'a06', Comp: () => <A06 state="empty" /> },
  { key: 'a06d', id: 'A-06', title: 'رفض إذن الموقع', group: 'home', parent: 'a06', Comp: () => <A06 state="denied" /> },
  { key: 'a07', id: 'A-07', title: 'صفحة المتجر ومنتجاته', group: 'home', Comp: () => <A07 state="default" /> },
  { key: 'a07e', id: 'A-07', title: 'بدون منتجات', group: 'home', parent: 'a07', Comp: () => <A07 state="empty" /> },

  /* المنتج والبحث */
  { key: 'a08', id: 'A-08', title: 'تفاصيل المنتج', group: 'catalog', Comp: () => <A08 state="default" /> },
  { key: 'a08o', id: 'A-08', title: 'نفاد المخزون', group: 'catalog', parent: 'a08', Comp: () => <A08 state="oos" /> },
  { key: 'a08n', id: 'A-08n', title: 'المنتج غير موجود — 404', group: 'catalog', parent: 'a08', badge: 'V3', Comp: () => <A08 state="404" /> },
  { key: 'a09', id: 'A-09', title: 'البحث الذكي + الاقتراحات', group: 'catalog', Comp: A09 },
  { key: 'a09n', id: 'A-09', title: 'لا نتائج مطابقة', group: 'catalog', parent: 'a09', Comp: () => <A09 state="none" /> },
  { key: 'a09e', id: 'A-09e', title: 'كلمة فارغة', group: 'catalog', parent: 'a09', badge: 'V3', Comp: () => <A09 state="emptykw" /> },
  { key: 'a09b', id: 'A-09b', title: 'لوحة التصفية والترتيب — Sheet', group: 'catalog', parent: 'a09', Comp: A09b },

  /* السلة والطلب */
  { key: 'a10', id: 'A-10', title: 'السلة — مراجعة وتعديل', group: 'order', Comp: A10 },
  { key: 'a10e', id: 'A-10', title: 'سلة فارغة', group: 'order', parent: 'a10', Comp: () => <A10 state="empty" /> },
  { key: 'a11', id: 'A-11', title: 'إتمام / إرسال الطلب', group: 'order', Comp: () => <A11 state="default" /> },
  { key: 'a11e', id: 'A-11', title: 'فشل تحقق المخزون', group: 'order', parent: 'a11', Comp: () => <A11 state="stockerr" /> },
  { key: 'a12', id: 'A-12', title: 'تأكيد إرسال الطلب — نجاح', group: 'order', Comp: A12 },
  { key: 'a13', id: 'A-13', title: 'طلباتي — تشمل «ملغى»', group: 'order', badge: 'V3', Comp: A13 },
  { key: 'a14', id: 'A-14', title: 'تتبع الطلب — Timeline', group: 'order', Comp: () => <A14 state="default" /> },
  { key: 'a14c', id: 'A-14', title: 'قابل للإلغاء', group: 'order', parent: 'a14', Comp: () => <A14 state="cancel" /> },
  { key: 'a14r', id: 'A-14r', title: 'طلب مرفوض — مسار الخروج', group: 'order', parent: 'a14', badge: 'V3', Comp: () => <A14 state="rejected" /> },
  { key: 'a15', id: 'A-15', title: 'تأكيد إلغاء الطلب — Dialog', group: 'order', Comp: A15 },

  /* الحساب والحماية */
  { key: 'a16', id: 'A-16', title: 'حسابي — مع حذف الحساب', group: 'account', badge: 'V3', Comp: A16 },
  { key: 'a17', id: 'A-17', title: '«تم حظر حسابك» — العميل', group: 'account', badge: 'V3', Comp: A17 },
  { key: 'a18', id: 'A-18', title: 'تأكيد حذف الحساب — Modal', group: 'account', badge: 'V3', Comp: A18 },
]
