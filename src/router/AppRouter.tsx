import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Favorites from '../pages/favorites/Favorites'
import Home from '../pages/home/Home'
import Cart from '../pages/cart/Cart'
import ProductDetail from '../pages/product-detail/ProductDetail'
import AuthGuard from './AuthGuard'
import { PublicRoutes } from '../models/routes.interfaces'
import Login from '../pages/auth/login/Login'
import Register from '../pages/auth/register/Register'
import Layout from '../components/layout/Layout'
const AppRouter = () => {
  //ROUTES PUBLIC
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PublicRoutes.LOGIN} element={<Login />} />
        <Route path={PublicRoutes.REGISTER} element={<Register />} />
        <Route element={<Layout />} >
          <Route index element={<Home />} />
          <Route path={PublicRoutes.FAVORITES} element={<Favorites />} />
          <Route path={PublicRoutes.CART} element={<Cart />} />
          <Route path={PublicRoutes.PRODUCTDETAIL} element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter