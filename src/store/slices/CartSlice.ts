import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitalStateCart, IProducts } from '../../models/products.interface'

const initialState: InitalStateCart = {
  products: [],
  totalProducts: 0,
  charging: false,
  total: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state, action: PayloadAction<IProducts>) {
      state.products.push(action.payload);
    },
    deleteCart(state, action: PayloadAction<number>) {
      const productUpdate = state.products.filter(product => product.id !== action.payload)
      state.products = productUpdate
    },
    getProductsInCart(state, action: PayloadAction<IProducts[]>) {
      state.products = action.payload
    },
    getNumberCart(state) {
      state.totalProducts = state.products.length
      state.charging = true
    },
    sumTotal(state, action: PayloadAction<IProducts[]>) {
      const total = action.payload.reduce((accumalator, current) => {
        return accumalator + current.price
      }, 0)
      state.total = total
    },
    updateCart(state, action: PayloadAction<{ stock: number, id: number }>) {

      const cartUpdate = state.products.map(product => {
        if (product.id === action.payload.id) {
          const priceOriginal = product.price / product.stock
          product.stock = action.payload.stock
          product.price = priceOriginal * product.stock
          return product
        }
        return product
      })
      localStorage.setItem('cart', JSON.stringify(cartUpdate))
    },

  }
})

export const { addCart, deleteCart, getProductsInCart, getNumberCart, sumTotal, updateCart } = cartSlice.actions

export default cartSlice.reducer