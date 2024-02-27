interface IPrivateRoutes {
 
}
interface IPublicRoutes {
  LOGIN: string;
  REGISTER: string;
  LAYOUT: string;
  FAVORITES: string,
  CART: string,
  HOME: string;
  PRODUCTDETAIL: string
}
export const PrivatesRoutes: IPrivateRoutes = {
  LAYOUT: '/',
  HOME: '/',
  FAVORITES: '/favorites',
  CART: '/cart',
  PRODUCTDETAIL: '/product/:id'
}

export const PublicRoutes: IPublicRoutes = {
  LOGIN: '/login',
  REGISTER: '/register',
  LAYOUT: '/',
  HOME: '/',
  FAVORITES: '/favorites',
  CART: '/cart',
  PRODUCTDETAIL: '/product/:id'
}