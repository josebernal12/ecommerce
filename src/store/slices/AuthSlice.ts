import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { IUserLogueado } from '../../models/user.interface';

const initialState: IUserLogueado = { id: '', name: '', email: '' }


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login(state, action:PayloadAction<IUserLogueado>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    getUserLogueado(state) {
      const user = localStorage.getItem('user')
      if (user) {
        const userParse: { id: string, name: string, email: string } = JSON.parse(user)
        state.id = userParse.id
        state.name = userParse.name
        state.email = userParse.email
      }

    },
    loginWithGoogle(state, action) {
      state.id = action.payload.uid;
      state.name = action.payload.displayName;
      state.email = action.payload.email;
    },
    loginWithFacebook(state, action) {
      state.id = action.payload.uid;
      state.name = action.payload.displayName;
      state.email = action.payload.email;
    },
    logout(state){
      state.name = "";
      state.email = "";
      state.id  = ""
      localStorage.removeItem('user')
    }
  }
})

export const { login, getUserLogueado, loginWithGoogle, loginWithFacebook, logout } = userSlice.actions
export default userSlice.reducer