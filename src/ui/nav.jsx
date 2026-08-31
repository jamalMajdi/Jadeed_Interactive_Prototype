import { createContext, useContext } from 'react'

// سياق التنقل بين الشاشات داخل النموذج — يسمح لعناصر داخل الشاشات (شريط سفلي، أزرار)
// بالانتقال إلى أي شاشة مسجلة في الفهرس.
export const NavCtx = createContext({ current: null, go: () => {}, list: [] })
export const useNav = () => useContext(NavCtx)
