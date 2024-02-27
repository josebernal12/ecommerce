import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { onLogin, onLoginWithFacebook, onLoginWithGoogle } from "../../../hooks/user"
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setuser] = useState({
    id: "",
    email: "",
    password: ""
  })
  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValid = await onLogin(user.email, user.password, dispatch)
    console.log(isValid)
    if (isValid) {
      navigate('/')
    }

  }
  const handleCLickGoogle = async () => {
    await onLoginWithGoogle(dispatch)
    navigate('/')

  }
  const handleClickFacebook = async () => {
    await onLoginWithFacebook(dispatch)
    navigate('/')
  }
  return (
    <div className="grid md:grid-cols-5 items-center gap-5">
      <div className="shadow-lg text-start p-5 col-span-2">
        <h1 className="font-bold text-2xl mb-2">Ecommerce</h1>
        <h3 className="text-blue-700 font-bold text-2xl mb-2">Welcome Back</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-5 ">
            <div className="flex flex-col justify-center items-center" >
              <label htmlFor="email">Email</label>
              <input type="text" id="email" onChange={handleUser} name="email" placeholder="correo@correo.com" className="text-center rounded-md border p-1 w-full" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={handleUser} name="password" placeholder="********" className="text-center rounded-md border p-1 w-full" />
            </div>
          </div>
          <div className="flex items-center my-5">
            <div className="border border-black w-full"></div>
            <div className="mx-2">or</div>
            <div className="border border-black w-full"></div>
          </div>
          <div className="flex flex-col space-y-3">
            <button onClick={handleCLickGoogle} className="flex items-center justify-center gap-2 border rounded-md p-3">
              <img className="w-6" src="/google.svg" alt="image google" />
              Sign In With Google
            </button>
            <button onClick={handleClickFacebook} className="flex items-center justify-center gap-2 border rounded-md p-3">
              <img className="w-6" src="/facebook.svg" alt="imagen facebook" />
              Sign In With Facebook
            </button>
          </div>
          <div className="flex justify-end mt-2">
            <Link to='#' className="text-blue-700 font-bold">Forgot Password?</Link>
          </div>
          <button className="w-full bg-blue-700 text-white rounded-md p-2 my-3 font-bold hover:bg-blue-600">Sign In to your Account</button>
          <Link to='/register' className="text-center mt-2 text-gray-500">Dont Have an account? <span className="text-blue-700 font-bold">Sign Up</span></Link>

        </form>
      </div>
      <div className="col-span-3 mx-auto">
        <img className="image-login" src="/login2.png" alt="imagen login" />
      </div>
    </div>
  )
}

export default Login