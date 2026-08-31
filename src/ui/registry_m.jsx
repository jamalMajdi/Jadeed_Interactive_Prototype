import B01 from '../screens/B01Welcome.jsx'
import B02 from '../screens/B02Data.jsx'
import B04 from '../screens/B04Docs.jsx'
import B05 from '../screens/B05Review.jsx'
import B06 from '../screens/B06Rejected.jsx'
import B07 from '../screens/B07Dashboard.jsx'
import B08 from '../screens/B08CreateStore.jsx'
import B09 from '../screens/B09StoreInfo.jsx'
import B10 from '../screens/B10Products.jsx'
import B11 from '../screens/B11ProductForm.jsx'
import B13 from '../screens/B13DeleteProduct.jsx'
import B14 from '../screens/B14Location.jsx'
import B15 from '../screens/B15Orders.jsx'
import B16 from '../screens/B16Details.jsx'
import B17 from '../screens/B17Stats.jsx'
import B18 from '../screens/B18Blocked.jsx'
import B19 from '../screens/B19Crud.jsx'

/* مجموعات رحلة التاجر + مراجع المصدر التحليلي */
export const MERCHANT_GROUPS = [
  { id: 'm-reg', name: 'تسجيل التاجر وتوثيقه', refs: 'ACT_requestToCreateStore · M1/M2/M3 · DD-11' },
  { id: 'm-store', name: 'لوحة المتجر وإعداده', refs: 'State-Store_Creation_Request · الشعار إجباري (V3)' },
  { id: 'm-products', name: 'المنتجات', refs: 'publishProduct · hideProduct · restoreProduct · C-18' },
  { id: 'm-orders', name: 'الطلبات الواردة', refs: 'Manage Incoming Orders · finishPreparation · getSignature' },
  { id: 'm-analytics', name: 'الإحصائيات والحماية', refs: 'getStatistics · sendNotification · حظر التاجر' },
]

/* فهرس شاشات التاجر — 14 شاشة رئيسية (B-01..B-19) + 15 حالة فرعية = 29 إدخالًا (جرد V3) */
export const MERCHANT_SCREENS = [
  /* تسجيل التاجر وتوثيقه */
  { key: 'b01', id: 'B-01', title: 'ترحيب التاجر', group: 'm-reg', Comp: B01 },
  { key: 'b02', id: 'B-02', title: 'نموذج تسجيل التاجر — حقول مدمجة', group: 'm-reg', badge: 'V3', Comp: B02 },
  { key: 'b04', id: 'B-04', title: 'رفع المستندات — وجهان منفصلان', group: 'm-reg', badge: 'V3', Comp: B04 },
  { key: 'b05', id: 'B-05', title: '«حسابك قيد المراجعة» (M2)', group: 'm-reg', Comp: B05 },
  { key: 'b06', id: 'B-06', title: 'إشعار الرفض + إعادة التقديم (M3)', group: 'm-reg', Comp: B06 },

  /* لوحة المتجر وإعداده */
  { key: 'b07', id: 'B-07', title: 'لوحة التاجر (Dashboard)', group: 'm-store', Comp: B07 },
  { key: 'b08', id: 'B-08', title: 'طلب إنشاء متجر — الشعار إجباري', group: 'm-store', badge: 'V3', Comp: () => <B08 state="default" /> },
  { key: 'b08g', id: 'B-08g', title: 'حارس: المتجر منشأ بالفعل', group: 'm-store', parent: 'b08', badge: 'V3', Comp: () => <B08 state="guard" /> },
  { key: 'b09', id: 'B-09', title: 'إدارة المتجر — تعديل المعلومات', group: 'm-store', Comp: () => <B09 state="default" /> },
  { key: 'b09e', id: 'B-09', title: 'تعديل المتجر — خطأ تحقق', group: 'm-store', parent: 'b09', Comp: () => <B09 state="error" /> },
  { key: 'b14', id: 'B-14', title: 'تحديد الموقع التجاري — خريطة', group: 'm-store', parent: 'b09', Comp: B14 },

  /* المنتجات */
  { key: 'b10', id: 'B-10', title: 'قائمة المنتجات — انتقالات الحالة', group: 'm-products', badge: 'V3', Comp: B10 },
  { key: 'b19', id: 'B-19', title: 'فشل عمليات المنتجات (CRUD)', group: 'm-products', parent: 'b10', badge: 'V3', Comp: B19 },
  { key: 'b12', id: 'B-12', title: 'تعديل منتج (نموذج معبأ)', group: 'm-products', parent: 'b10', Comp: () => <B11 state="edit" /> },
  { key: 'b13', id: 'B-13', title: 'تأكيد حذف منتج (Dialog)', group: 'm-products', parent: 'b10', Comp: B13 },
  { key: 'b11', id: 'B-11', title: 'إضافة منتج — تصنيف إجباري', group: 'm-products', badge: 'V3', Comp: () => <B11 state="add" /> },

  /* الطلبات الواردة */
  { key: 'b15', id: 'B-15', title: 'الطلبات الواردة (Incoming)', group: 'm-orders', Comp: () => <B15 state="default" /> },
  { key: 'b15e', id: 'B-15e', title: 'الطلبات الواردة — فارغة', group: 'm-orders', parent: 'b15', badge: 'V3', Comp: () => <B15 state="empty" /> },
  { key: 'b16n', id: 'B-16', title: 'تفاصيل الطلب — «جديد»', group: 'm-orders', Comp: () => <B16 state="new" /> },
  { key: 'b16a', id: 'B-16', title: 'مقبول — بانتظار التحضير', group: 'm-orders', parent: 'b16n', Comp: () => <B16 state="accepted" /> },
  { key: 'b16p', id: 'B-16', title: 'قيد التحضير', group: 'm-orders', parent: 'b16n', Comp: () => <B16 state="preparing" /> },
  { key: 'b16r', id: 'B-16', title: 'جاهز (Ready)', group: 'm-orders', parent: 'b16n', badge: 'V3', Comp: () => <B16 state="ready" /> },
  { key: 'b16s', id: 'B-16', title: 'خارج للتوصيل', group: 'm-orders', parent: 'b16n', Comp: () => <B16 state="delivering" /> },
  { key: 'b16d', id: 'B-16', title: 'تم التسليم — توقيع العميل', group: 'm-orders', parent: 'b16n', Comp: () => <B16 state="delivered" /> },
  { key: 'b16rej', id: 'B-16', title: 'مرفوض — مسار الخروج', group: 'm-orders', parent: 'b16n', Comp: () => <B16 state="rejected" /> },

  /* الإحصائيات والحماية */
  { key: 'b17', id: 'B-17', title: 'إحصائيات المتجر', group: 'm-analytics', Comp: () => <B17 state="ok" /> },
  { key: 'b17na', id: 'B-17', title: 'الإحصائيات — غير متاحة', group: 'm-analytics', parent: 'b17', Comp: () => <B17 state="na" /> },
  { key: 'b17g', id: 'B-17g', title: 'الإحصائيات — غير مصرح', group: 'm-analytics', parent: 'b17', badge: 'V3', Comp: () => <B17 state="guard" /> },
  { key: 'b18', id: 'B-18', title: '«تم حظر حسابك» — التاجر', group: 'm-analytics', badge: 'V3', Comp: B18 },
]
