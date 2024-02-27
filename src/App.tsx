/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllFavorite } from './store/slices/FavoritesSlices'
import AppRouter from './router/AppRouter'
import { filterProductByCategory, filterProducts, getProductsPaginator } from './store/slices/ProductsSlices'
import { getNumberCart, getProductsInCart } from './store/slices/CartSlice'
import { IProducts } from './models/products.interface'
import { getUserLogueado } from './store/slices/AuthSlice'
function App() {
  const dispatch = useDispatch()
  //TODO REVISAR QUE TODO FUNCIONE BIEN
  useEffect(() => {
    const productsLocalStorage = localStorage.getItem('favorites')
    if (productsLocalStorage) {
      const productsParse = JSON.parse(productsLocalStorage)
      dispatch(getAllFavorite(productsParse))
    }
  }, [])
  useEffect(() => {
    const productsFilter = localStorage.getItem('filter')
    const productsFilterCategory = localStorage.getItem('category')
    if (productsFilter === "") {
      if (productsFilterCategory) {
        const productsFilterCategoryParse = JSON.parse(productsFilterCategory)
        dispatch(filterProductByCategory(productsFilterCategoryParse))
      }
    }
    if (productsFilterCategory === "") {
      dispatch(filterProducts(Number(productsFilter)))

    }
  }, [])
  useEffect(() => {
    const productsCart = localStorage.getItem('cart')
    if (productsCart) {
      const productsCartParse: IProducts[] = JSON.parse(productsCart)
      dispatch(getProductsInCart(productsCartParse))
    }
    dispatch(getProductsPaginator(1))
    dispatch(getNumberCart())
    dispatch(getUserLogueado())
  }, [])
  return (
    <AppRouter />
  )
}

export default App
