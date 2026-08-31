// بيانات وهمية — تطبيق التاجر "جديد" (متجر: بقالة النور)
// الطلبات 1051 و1036 تعكس نفس طلبات تطبيق العميل — اتساق بين التطبيقين

import { Carrot, Apple, Milk, Egg, Banana, CupSoda, Leaf, Salad } from 'lucide-react'

export const storeInfo = {
  name: 'بقالة النور',
  owner: 'علي ناصر',
  city: 'عدن — كريتر',
  rating: 4.5,
  open: true,
  since: 'مارس 2026',
}

export const SEED_PRODUCTS = [
  { id: 'mp1', name: 'طماطم بلدي طازجة', price: 900, unit: 'كيلو', stock: 18, status: 'active', icon: 'Carrot', sold: 64 },
  { id: 'mp2', name: 'تفاح أحمر مستورد', price: 1450, unit: 'كيلو', stock: 9, status: 'active', icon: 'Apple', sold: 41 },
  { id: 'mp3', name: 'حليب طازج ١ لتر', price: 1100, unit: 'عبوة', stock: 24, status: 'active', icon: 'Milk', sold: 88 },
  { id: 'mp4', name: 'بيض بلدي — طبق ٣٠', price: 4200, unit: 'طبق', stock: 0, status: 'draft', icon: 'Egg', sold: 12 },
  { id: 'mp5', name: 'موز بلدي', price: 600, unit: 'كيلو', stock: 15, status: 'active', icon: 'Banana', sold: 37 },
  { id: 'mp6', name: 'عصير برتقال طازج', price: 800, unit: 'لتر', stock: 10, status: 'draft', icon: 'CupSoda', sold: 0 },
  { id: 'mp7', name: 'فلفل أخضر حار', price: 800, unit: 'كيلو', stock: 6, status: 'hidden', icon: 'Leaf', sold: 19 },
  { id: 'mp8', name: 'خيار بلدي', price: 500, unit: 'كيلو', stock: 30, status: 'active', icon: 'Salad', sold: 52 },
]

export const PRODUCT_STATUS = {
  active: { label: 'منشور', cls: 'bg-jadeed-tint text-jadeed-purple' },
  draft: { label: 'مسودة', cls: 'bg-jadeed-gray text-jadeed-muted' },
  hidden: { label: 'مخفي', cls: 'bg-jadeed-yellow-tint text-jadeed-yellow-dark' },
}

export const SEED_ORDERS = [
  {
    id: 1062, customer: 'سامي عبده', time: 'قبل ٣ د', total: 5700, status: 'new',
    address: 'عدن — كريتر، شارع الجامعة', phone: '+967 771 234 567', note: 'تفضل الطماطم ناضجة متوسطة',
    items: [{ name: 'تفاح أحمر مستورد', qty: 2, price: 1450 }, { name: 'كرواسان بالزبدة', qty: 4, price: 700 }],
  },
  {
    id: 1063, customer: 'أمل قاسم', time: 'قبل ١٢ د', total: 3100, status: 'accepted',
    address: 'عدن — كريتر، القاعدة', phone: '+967 733 111 222',
    items: [{ name: 'حليب طازج ١ لتر', qty: 2, price: 1100 }, { name: 'طماطم بلدي طازجة', qty: 1, price: 900 }],
  },
  {
    id: 1051, customer: 'سامي عبده', time: 'قبل ٢٠ د', total: 9300, status: 'preparing',
    address: 'عدن — كريتر، شارع الجامعة', phone: '+967 771 234 567',
    items: [{ name: 'طماطم بلدي طازجة', qty: 2, price: 900 }, { name: 'حليب طازج ١ لتر', qty: 3, price: 1100 }, { name: 'بيض بلدي — طبق ٣٠', qty: 1, price: 4200 }],
  },
  {
    id: 1054, customer: 'وليد صالح', time: 'قبل ٣٣ د', total: 4200, status: 'ready',
    address: 'عدن — المنصورة، الممدارة', phone: '+967 777 888 999',
    items: [{ name: 'موز بلدي', qty: 7, price: 600 }],
  },
  {
    id: 1058, customer: 'هدى عبدالله', time: 'قبل ٥٠ د', total: 5850, status: 'delivering',
    address: 'عدن — كريتر، الشعب', phone: '+967 712 345 678',
    items: [{ name: 'حليب طازج ١ لتر', qty: 4, price: 1100 }, { name: 'تفاح أحمر مستورد', qty: 1, price: 1450 }],
  },
  {
    id: 1039, customer: 'فؤاد الشامي', time: 'أمس · ٦:١٠ م', total: 3100, status: 'delivered',
    address: 'عدن — خور مكسر، أبيس', phone: '+967 730 000 111',
    items: [{ name: 'طماطم بلدي طازجة', qty: 1, price: 900 }, { name: 'حليب طازج ١ لتر', qty: 2, price: 1100 }],
  },
  {
    id: 1036, customer: 'سامي عبده', time: 'أمس · ٩:١٥ ص', total: 4200, status: 'rejected',
    reason: 'نفدت الكمية — البيض غير متوفر حاليًا',
    address: 'عدن — كريتر، شارع الجامعة', phone: '+967 771 234 567',
    items: [{ name: 'بيض بلدي — طبق ٣٠', qty: 1, price: 4200 }],
  },
]

/* حالات الطلب من وجهة نظر التاجر (B-16) */
export const ORDER_STATE_META = {
  new: { label: 'جديد', cls: 'bg-jadeed-orange-tint text-jadeed-orange', dot: 'bg-jadeed-orange' },
  accepted: { label: 'مقبول — بانتظار التحضير', cls: 'bg-jadeed-tint text-jadeed-purple', dot: 'bg-jadeed-purple-light' },
  preparing: { label: 'قيد التحضير', cls: 'bg-jadeed-yellow-tint text-jadeed-yellow-dark', dot: 'bg-jadeed-yellow' },
  ready: { label: 'جاهز', cls: 'bg-jadeed-tint text-jadeed-purple', dot: 'bg-jadeed-purple' },
  delivering: { label: 'خارج للتوصيل', cls: 'bg-jadeed-tint text-jadeed-purple-deep', dot: 'bg-jadeed-purple-deep' },
  delivered: { label: 'تم التسليم', cls: 'bg-jadeed-gray text-jadeed-muted', dot: 'bg-jadeed-ghost' },
  rejected: { label: 'مرفوض', cls: 'bg-jadeed-red-tint text-jadeed-red', dot: 'bg-jadeed-red' },
}

/* تسلسل حالات الطلب (لشريط التقدم في B-16) */
export const ORDER_FLOW = ['new', 'accepted', 'preparing', 'ready', 'delivering', 'delivered']

/* مفتاح شاشة التفاصيل لكل حالة — للتنقل من B-15 */
export const DETAIL_KEY = {
  new: 'b16n', accepted: 'b16a', preparing: 'b16p', ready: 'b16r',
  delivering: 'b16s', delivered: 'b16d', rejected: 'b16rej',
}

export const WEEK_REVENUE = [
  { d: 'السبت', v: 18600 }, { d: 'الأحد', v: 24200 }, { d: 'الاثنين', v: 19800 },
  { d: 'الثلاثاء', v: 27400 }, { d: 'الأربعاء', v: 31500 }, { d: 'الخميس', v: 42800 }, { d: 'الجمعة', v: 50200 },
]
