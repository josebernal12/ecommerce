import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitialStateProductDetail } from '../../models/products.interface'
import { products } from '../../data/products';

const initialState: InitialStateProductDetail = {
  product: { id: 0, name: "", category: "", price: 0, stock: 0, image: "", available: 0 },
  relatedProducts: [],
  charging: false,
  hiddenNav: false
}


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductById(state, action: PayloadAction<number>) {
      state.charging = false
      const productId = products.find(product => product.id === action.payload)
      if (productId) {
        state.product.name = productId.name
        state.product.id = productId.id
        state.product.category = productId.category
        state.product.image = productId.image
        state.product.price = productId.price
        state.product.stock = productId.stock
        state.product.available = productId.available
        state.charging = true
      }
    },
    relatedContent(state, action: PayloadAction<{ name: string, category: string }>) {

      const productsCategory = products.filter(product => product.category.toLowerCase() === action.payload.category.toLowerCase())
      const productCategories = productsCategory.filter(product => product.name !== action.payload.name)
      state.relatedProducts = productCategories


    },
    setHiddenValue(state, action: PayloadAction<boolean>) {
      state.hiddenNav = action.payload
    }

  }
})

export const { getProductById, relatedContent, setHiddenValue } = productSlice.actions
export default productSlice.reducer