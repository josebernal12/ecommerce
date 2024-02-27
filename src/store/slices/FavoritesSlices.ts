import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProducts } from '../../models/products.interface'



const initialState: IProducts[] = []

const FavoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<IProducts>) {
      localStorage.setItem('favorites', JSON.stringify([...state, action.payload]))
      state.push(action.payload);

    },
    deleteFavorites(state, action: PayloadAction<number>) {
      const idToDelete = action.payload;
      const updatedFavorites = state.filter(product => product.id !== idToDelete);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    },
    getAllFavorite(_state, action: PayloadAction<IProducts[]>) {
      return action.payload
    },
   


  }
})

export const { addFavorite, deleteFavorites, getAllFavorite } = FavoritesSlice.actions
export default FavoritesSlice.reducer