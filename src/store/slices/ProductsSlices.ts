import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitialStateProducts } from '../../models/products.interface';
import { products, newProducts } from '../../data/products';


const initialState: InitialStateProducts = {
  products,
  newProducts,
  productsDiscount: [],
  productsPopulars: [],
  productsFilter: products,
  productsBeforeFilter: [],
  productsPaginator: [],
  productsSearch: [],
  numberPage: 0,
  message: ""
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProducts(state, action: PayloadAction<number>) {
      if (action.payload === 1) {
        state.productsFilter = state.products
        localStorage.setItem('filter', JSON.stringify(1))
        state.productsPaginator = state.products.slice(0, 10)
        state.numberPage = 1
        state.productsSearch = []
        state.message = ''
        if (state.productsFilter.length === 0) {
          state.message = "No Hay Productos"
        }
      } else if (action.payload === 2) {
        state.productsFilter = state.newProducts
        state.productsPaginator = state.newProducts.slice(0, 10)
        localStorage.setItem('filter', JSON.stringify(2))
        state.numberPage = 1
        state.productsSearch = []
        state.message = ''
        if (state.productsFilter.length === 0) {
          state.message = "No Hay Productos"
        }
      } else if (action.payload === 3) {
        state.productsFilter = state.productsPopulars
        localStorage.setItem('filter', JSON.stringify(3))
        state.productsPaginator = state.productsPopulars.slice(0, 10)
        state.numberPage = 1
        state.productsSearch = []
        state.message = ''
        if (state.productsFilter.length === 0) {
          state.message = "No Hay Productos"
        }
      } else {
        state.productsFilter = state.productsDiscount
        localStorage.setItem('filter', JSON.stringify(4))
        state.productsPaginator = state.productsDiscount.slice(0, 10)
        state.numberPage = 1
        state.productsSearch = []
        state.message = ''
        if (state.productsFilter.length === 0) {
          state.message = "No Hay Productos"
        }
      }
      state.productsBeforeFilter = state.productsFilter
    },
    pagination(state, action: PayloadAction<{ indexOfLastItem: number, indexOfFirstItem: number, numberPage: number }>) {
      const currentItems = state.productsFilter.slice(action.payload.indexOfFirstItem, action.payload.indexOfLastItem);
      state.productsPaginator = currentItems
      state.numberPage = action.payload.numberPage

    },
    getProductsPaginator(state, action: PayloadAction<number>) {
      state.productsPaginator = state.productsFilter.slice(0, 10)
      state.numberPage = action.payload
    },
    searchProduct(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.productsSearch = []
        state.productsFilter = state.productsBeforeFilter
        state.message = '';
        return
      }
      const productsSearch = state.productsFilter.filter(product => product.name.toLowerCase().includes(action.payload.toLowerCase()));
      if (productsSearch.length >= 1) {
        state.productsSearch = productsSearch
        state.productsFilter = state.productsSearch.slice(0, 10)
        state.message = ''
      } else {
        state.message = 'No Hay Productos Disponibles'

      }
    },
    getProductsByCategories(state, action: PayloadAction<string>) {
      const productsCategories = state.products.filter(product => product.category === action.payload)
      state.productsPaginator = productsCategories
      state.productsFilter = productsCategories
      state.productsSearch = []
      state.message = ''
    },
    filterProductByCategory(state, action: PayloadAction<string>) {
      const productsFilterByCategoty = state.productsFilter.filter(product => product.category.toLowerCase() === action.payload)
      state.productsFilter = productsFilterByCategoty
    }

  }
})

export const { filterProducts, pagination, getProductsPaginator, searchProduct, getProductsByCategories, filterProductByCategory } = productsSlice.actions
export default productsSlice.reducer