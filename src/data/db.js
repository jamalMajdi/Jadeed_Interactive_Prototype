// بيانات وهمية واقعية — تطبيق العميل "جديد"
// المصدر: ملفات التحليل (متاجر قريبة، منتجات، دورة حياة الطلب State-Order)

export const user = {
  name: 'سامي عبده',
  phone: '+967 771 234 567',
  email: 'sami@example.com',
  city: 'عدن — كريتر',
  street: 'شارع الجامعة، قرب جولة القاعدة',
}

export const stores = [
  { id: 's1', name: 'بقالة النور', cat: 'خضار وفواكه طازجة', rating: 4.5, dist: '1.2 كم', eta: '~١٥ د', open: true },
  { id: 's2', name: 'سوبر ماركت الأمل', cat: 'عصائر ومعلبات', rating: 4.1, dist: '2.0 كم', eta: '~٢٢ د', open: true },
  { id: 's3', name: 'مخبزة السلام', cat: 'حلويات ومخبوزات', rating: 3.9, dist: '2.8 كم', eta: '~٣٠ د', open: true },
  { id: 's4', name: 'مطعم الضيافة', cat: 'وجبات وتوصيل سريع', rating: 4.3, dist: '3.4 كم', eta: '~٢٥ د', open: true },
  { id: 's5', name: 'سوق الميناء', cat: 'بقالة عامة وأسماك', rating: 4.0, dist: '4.1 كم', eta: '~٤٠ د', open: false },
]

// icon: اسم أيقونة lucide — يُربط في ProductIcon
export const products = [
  { id: 'p1', store: 'بقالة النور', name: 'طماطم بلدي طازجة', price: 900, unit: 'كيلو', rating: 4.6, stock: true, icon: 'Carrot', cat: 'خضار وفواكه', syn: 'بندورة', desc: 'طماطم بلدي تُجمع يوميًا من مزارع محلية' },
  { id: 'p2', store: 'بقالة النور', name: 'تفاح أحمر مستورد', price: 1450, unit: 'كيلو', rating: 4.4, stock: true, icon: 'Apple', cat: 'خضار وفواكه', syn: '', desc: 'تفاح أحمر مستورد مبرد يحفظ قرمشته' },
  { id: 'p3', store: 'بقالة النور', name: 'حليب طازج ١ لتر', price: 1100, unit: 'عبوة', rating: 4.8, stock: true, icon: 'Milk', cat: 'ألبان وبيض', syn: 'لبن', desc: 'حليب طازج مبستر — مصدر محلي' },
  { id: 'p4', store: 'بقالة النور', name: 'بيض بلدي — طبق ٣٠', price: 4200, unit: 'طبق', rating: 4.7, stock: false, icon: 'Egg', cat: 'ألبان وبيض', syn: 'طبق بيض', desc: 'بيض بلدي بلون طبيعي — طبق ٣٠ حبة' },
  { id: 'p5', store: 'مخبزة السلام', name: 'كرواسان بالزبدة', price: 700, unit: 'حبة', rating: 4.5, stock: true, icon: 'Croissant', cat: 'مخبوزات', syn: 'كرواسون', desc: 'كرواسان بالزبدة يُخبز صباح كل يوم' },
  { id: 'p6', store: 'مخبزة السلام', name: 'معمول بالتمر', price: 500, unit: 'نصف كيلو', rating: 4.2, stock: true, icon: 'Cookie', cat: 'مخبوزات', syn: '', desc: 'معمول بالتمر محضّر طازجًا يوميًا' },
  { id: 'p7', store: 'سوبر ماركت الأمل', name: 'عصير مانجو طبيعي', price: 600, unit: 'لتر', rating: 4.3, stock: true, icon: 'CupSoda', cat: 'عصائر ومشروبات', syn: 'مانجو', desc: 'عصير مانجو طبيعي ١٠٠٪ بدون سكر مضاف' },
  { id: 'p8', store: 'سوق الميناء', name: 'سمك حريذ طازج', price: 3500, unit: 'كيلو', rating: 4.1, stock: true, icon: 'Fish', cat: 'بقالة عامة', syn: 'حريذ', desc: 'سمك حريذ طازج من بحر عدن' },
  { id: 'p9', store: 'مطعم الضيافة', name: 'شاورما دجاج عربي', price: 1800, unit: 'سندويش', rating: 4.6, stock: true, icon: 'Sandwich', cat: 'وجبات', syn: '', desc: 'شاورما دجاج عربي بخبز طازج وثومية منزلية' },
  { id: 'p10', store: 'مطعم الضيافة', name: 'دجاج مشوي كامل', price: 4800, unit: 'حبة', rating: 4.7, stock: true, icon: 'Chicken', cat: 'وجبات', syn: '', desc: 'دجاج مشوي كامل على الفحم ببهارات البيت' },
]

export const cartItems = [
  { id: 'p1', name: 'طماطم بلدي طازجة', store: 'بقالة النور', price: 900, qty: 2, unit: 'كيلو', icon: 'Carrot' },
  { id: 'p3', name: 'حليب طازج ١ لتر', store: 'بقالة النور', price: 1100, qty: 3, unit: 'عبوة', icon: 'Milk' },
  { id: 'p4', name: 'بيض بلدي — طبق ٣٠', store: 'بقالة النور', price: 4200, qty: 1, unit: 'طبق', icon: 'Egg' },
]

export const DELIVERY_FEE = 500

export const orders = [
  {
    id: 1051, store: 'بقالة النور', date: 'اليوم · ٣:٤٠ م', total: 9800, status: 'preparing',
    items: 'طماطم ×٢ · حليب ×٣ · بيض ×١',
    steps: ['تم استلام الطلب', 'قيد التحضير', 'جاهز للاستلام', 'خارج للتوصيل', 'تم التسليم'],
  },
  {
    id: 1048, store: 'مطعم الضيافة', date: 'أمس · ٨:١٢ م', total: 5400, status: 'delivering',
    items: 'شاورما ×٢ · دجاج مشوي ×١',
    steps: ['تم استلام الطلب', 'قيد التحضير', 'جاهز للاستلام', 'خارج للتوصيل', 'تم التسليم'],
  },
  {
    id: 1044, store: 'مخبزة السلام', date: '٢٩ أغسطس · ٥:٠٥ م', total: 2400, status: 'delivered',
    items: 'كرواسان ×٢ · معمول ×٢',
    steps: ['تم استلام الطلب', 'قيد التحضير', 'جاهز للاستلام', 'خارج للتوصيل', 'تم التسليم'],
  },
  {
    id: 1040, store: 'سوبر ماركت الأمل', date: '٢٦ أغسطس · ١١:٢٠ ص', total: 3600, status: 'cancelled',
    items: 'عصير مانجو ×٦',
    steps: ['تم استلام الطلب', 'قيد التحضير', 'أُلغي الطلب'],
  },
  {
    id: 1036, store: 'بقالة النور', date: '٢٤ أغسطس · ٩:١٥ ص', total: 4200, status: 'rejected',
    reason: 'المنتج غير متوفر حاليًا — اعتذار المتجر',
    items: 'بيض بلدي ×١',
    steps: ['تم استلام الطلب', 'قيد التحضير', 'مرفوض'],
  },
]

export const STATUS_META = {
  preparing: { label: 'قيد التحضير', cls: 'bg-jadeed-yellow-tint text-jadeed-yellow-dark' },
  delivering: { label: 'خارج للتوصيل', cls: 'bg-jadeed-tint text-jadeed-purple' },
  delivered: { label: 'تم التسليم', cls: 'bg-jadeed-tint text-jadeed-purple-deep' },
  cancelled: { label: 'ملغى', cls: 'bg-jadeed-gray text-jadeed-muted' },
  rejected: { label: 'مرفوض', cls: 'bg-jadeed-red-tint text-jadeed-red' },
}

export const fmt = (n) => n.toLocaleString('en-US') + ' ريال'
