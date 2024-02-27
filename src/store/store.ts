import { configureStore } from "@reduxjs/toolkit";
import ProductsSlices from "./slices/ProductsSlices";
import FavoritesSlice from "./slices/FavoritesSlices";
import ProductSlice from "./slices/ProductSlice";
import CartSlice from "./slices/CartSlice";
import AuthSlice from "./slices/AuthSlice";

export const store = configureStore({
  reducer: {
    products: ProductsSlices,
    favorites: FavoritesSlice,
    product: ProductSlice,
    cart: CartSlice,
    user: AuthSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


