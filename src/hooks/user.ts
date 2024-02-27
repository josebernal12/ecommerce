import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  // sendEmailVerification,
} from 'firebase/auth'
import { User } from '../models/user.interface'
import { Dispatch } from 'redux'
import { login, loginWithFacebook, loginWithGoogle } from '../store/slices/AuthSlice'
import { app } from '../config/firebase'
//TODO REVISAR BOTON FACEBOOK
//TODO ARREGLAR LOS ERRORES DE FIREBASE
const auth = getAuth(app)

const onCreateUser = async (user: User, dispatch: Dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)
    const newUser = userCredential.user
    if (newUser) {
      // sendEmailVerification(newUser)
      if (auth.currentUser) {
        if (newUser.displayName && newUser.email) {
          await updateProfile(auth.currentUser, { displayName: user.name })
          dispatch(login({ id: newUser.uid, name: newUser.displayName, email: newUser.email }))
          localStorage.setItem('user', JSON.stringify({ id: newUser.uid, name: newUser.displayName, email: newUser.email }))
        }
      }
    }

  } catch (error) {
    console.log(error)
  }
}
const onLogin = async (email: string, password: string, dispatch: Dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    if (user.displayName && user.email) {
      dispatch(login({ id: user.uid, name: user.displayName, email: user.email }))
      localStorage.setItem('user', JSON.stringify({ id: user.uid, name: user.displayName, email: user.email }))
      return true
    }
    return false
  } catch (error) {
    console.log(error)
    return false
  }
}
const onLoginWithGoogle = async (dispatch: Dispatch) => {
  try {
    const provider = new GoogleAuthProvider()
    const credential = await signInWithPopup(auth, provider)
    const user = credential.user
    dispatch(loginWithGoogle(user))
    localStorage.setItem('user', JSON.stringify({ id: user.uid, name: user.displayName, email: user.email }))

  } catch (error) {
    console.log(error)
  }
}

const onLoginWithFacebook = async (dispatch: Dispatch) => {
  try {
    const provider = new FacebookAuthProvider()
    const credential = await signInWithPopup(auth, provider)
    const user = credential.user
    dispatch(loginWithFacebook(user))
  } catch (error) {
    console.log(error)
  }
}
export {
  onCreateUser,
  onLogin,
  onLoginWithGoogle,
  onLoginWithFacebook
}