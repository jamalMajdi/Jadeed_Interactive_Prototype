// بيانات وهمية — لوحة إدارة «جديد» (مربوطة ببيانات العميل والتاجر: نفس المتاجر والطلبات)

export const ADMINS = [
  { name: 'أبو فهد', role: 'مدير عام', email: 'admin@jadeed.ye' },
]

/* طلبات توثيق التجار (C-03/C-04) — الحالات: قيد المراجعة · مستندات ناقصة (V3) */
export const SEED_VERIFY = [
  { id: 'REQ-2891', store: 'مخبزة السلام', owner: 'نادر الحضرمي', city: 'عدن — كريتر', date: 'اليوم · ١٠:٢٢ ص', status: 'docs', docs: { front: true, back: true, storefront: false } },
  { id: 'REQ-2894', store: 'سوبر ماركت الأمل', owner: 'وفاء المصري', city: 'عدن — المنصورة', date: 'اليوم · ٩:٠٥ ص', status: 'review', docs: { front: true, back: true, storefront: true } },
  { id: 'REQ-2896', store: 'عصائر الخليج', owner: 'طارق باعمر', city: 'عدن — خور مكسر', date: 'أمس · ٦:٤٠ م', status: 'review', docs: { front: true, back: true, storefront: true } },
]

/* طلبات إنشاء المتاجر (C-05/C-06) */
export const SEED_STORE_REQ = [
  { id: 'STR-104', store: 'سوق الميناء', owner: 'عمار البكري', cat: 'بقالة عامة وأسماك', date: 'اليوم · ٨:٣٠ ص', status: 'pending' },
  { id: 'STR-103', store: 'مطعم الضيافة', owner: 'خالد الصائغ', cat: 'وجبات', date: 'أمس · ٢:١٥ م', status: 'pending' },
]

/* المستخدمون (C-07/C-08) — عملاء وتجار معًا */
export const SEED_USERS = [
  { id: 'u1', name: 'سامي عبده', type: 'عميل', phone: '+967 771 234 567', orders: 12, status: 'active' },
  { id: 'u2', name: 'بقالة النور', type: 'تاجر', phone: '+967 771 456 890', orders: 143, status: 'active' },
  { id: 'u3', name: 'أمل قاسم', type: 'عميل', phone: '+967 733 111 222', orders: 7, status: 'active' },
  { id: 'u4', name: 'وليد صالح', type: 'عميل', phone: '+967 777 888 999', orders: 3, status: 'active' },
  { id: 'u5', name: 'مطعم الضيافة', type: 'تاجر', phone: '+967 712 345 678', orders: 98, status: 'active' },
  { id: 'u6', name: 'هدى عبدالله', type: 'عميل', phone: '+967 712 345 678', orders: 21, status: 'active' },
]

/* التجار (C-09) */
export const SEED_MERCHANTS = [
  { store: 'بقالة النور', owner: 'علي ناصر', city: 'كريتر', rating: 4.5, products: 8, orders: 143, since: 'مارس 2026', status: 'active' },
  { store: 'مطعم الضيافة', owner: 'خالد الصائغ', city: 'كريتر', rating: 4.3, products: 12, orders: 98, since: 'أبريل 2026', status: 'active' },
  { store: 'سوق الميناء', owner: 'عمار البكري', city: 'خور مكسر', rating: 4.0, products: 0, orders: 0, since: '—', status: 'setup' },
]

/* منتجات التجار مجمعة (C-10/C-11) */
export const SEED_MERCHANT_PRODUCTS = [
  {
    store: 'بقالة النور',
    items: [
      { id: 'mp1', name: 'طماطم بلدي طازجة', price: 900, status: 'available', reported: false },
      { id: 'mp4', name: 'بيض بلدي — طبق ٣٠', price: 4200, status: 'unavailable', reported: true, report: 'شكوى عميل: منتج غير متوفر معروض للبيع' },
      { id: 'mp2', name: 'تفاح أحمر مستورد', price: 1450, status: 'available', reported: false },
    ],
  },
  {
    store: 'مطعم الضيافة',
    items: [
      { id: 'mp9', name: 'شاورما دجاج عربي', price: 1800, status: 'available', reported: false },
      { id: 'mp10', name: 'دجاج مشوي كامل', price: 4800, status: 'available', reported: false },
    ],
  },
]

/* الطلبات (C-12/C-13) — نفس طلبات تطبيق التاجر */
export const SEED_ALL_ORDERS = [
  { id: 1062, customer: 'سامي عبده', store: 'بقالة النور', total: 5700, status: 'جديد', date: 'اليوم · ٣:٥٢ م' },
  { id: 1051, customer: 'سامي عبده', store: 'بقالة النور', total: 9300, status: 'قيد التحضير', date: 'اليوم · ٣:٤٠ م' },
  { id: 1058, customer: 'هدى عبدالله', store: 'بقالة النور', total: 5850, status: 'خارج للتوصيل', date: 'اليوم · ٢:٥٥ م' },
  { id: 1039, customer: 'فؤاد الشامي', store: 'بقالة النور', total: 3100, status: 'تم التسليم', date: 'أمس · ٦:١٠ م' },
  { id: 1036, customer: 'سامي عبده', store: 'بقالة النور', total: 4200, status: 'مرفوض', date: 'أمس · ٩:١٥ ص' },
]
export const TRACK_STEPS = ['تم استلام الطلب', 'قُبل من المتجر', 'قيد التحضير', 'جاهز', 'خارج للتوصيل', 'تم التسليم']

/* الفئات (C-18 ★) — نفس فئات نموذج منتج التاجر B-11 */
export const SEED_CATEGORIES = [
  { id: 'c1', name: 'خضار وفواكه', products: 34 },
  { id: 'c2', name: 'ألبان وبيض', products: 18 },
  { id: 'c3', name: 'مخبوزات', products: 22 },
  { id: 'c4', name: 'عصائر ومشروبات', products: 15 },
  { id: 'c5', name: 'وجبات', products: 27 },
  { id: 'c6', name: 'بقالة عامة', products: 41 },
]

/* البنرات والعروض (C-19 ★) */
export const SEED_BANNERS = [
  { id: 'b1', title: 'خصم ٢٠٪ — عرض الميناء', sub: 'على مشتيات الأسماك طيلة الأسبوع', tone: 'orange', active: true, views: 12400 },
  { id: 'b2', title: 'توصيل مجاني', sub: 'للطلبات فوق ١٥٠٠٠ ريال داخل كريتر', tone: 'purple', active: true, views: 8900 },
  { id: 'b3', title: 'افتتاح فرع المنصورة', sub: 'قريبًا — متاجر جديدة تنضم لجديد', tone: 'yellow', active: false, views: 0 },
]

/* أدوار المشرفين (C-14) — هيكل أولي انظر Gap-07 */
export const SEED_ROLES = [
  { role: 'مدير عام', users: 1, perms: ['كل الصلاحيات'], tone: 'purple' },
  { role: 'مشرف توثيق', users: 2, perms: ['طلبات التوثيق', 'طلبات المتاجر'], tone: 'orange' },
  { role: 'مراجع محتوى', users: 3, perms: ['مراجعة المنتجات', 'إدارة الفئات', 'البنرات'], tone: 'yellow' },
  { role: 'دعم العملاء', users: 4, perms: ['تتبع الطلبات', 'حظر/رفع الحظر'], tone: 'gray' },
]

/* سجل النشاط (C-15) */
export const SEED_LOG = [
  { time: 'اليوم · ١٠:٤١ ص', actor: 'مشرف توثيق — سالم', action: 'وافق على طلب توثيق REQ-2890', tone: 'ok' },
  { time: 'اليوم · ١٠:١٢ ص', actor: 'مدير عام — أبو فهد', action: 'رفع حظر المستخدم وليد صالح', tone: 'warn' },
  { time: 'اليوم · ٩:٥٠ ص', actor: 'مراجع — ريم', action: 'أخفت منتج «مشروب طاقة» لمخالفة الوصف', tone: 'err' },
  { time: 'أمس · ٦:٢٠ م', actor: 'النظام', action: 'نسخ احتياطي تلقائي لقاعدة البيانات', tone: 'info' },
]
