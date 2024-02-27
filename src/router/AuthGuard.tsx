import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import Layout from "../components/layout/Layout"
import { Navigate } from "react-router-dom"
import {  PublicRoutes } from "../models/routes.interfaces"

const AuthGuard = () => {
  const email = useSelector((state: RootState) => state.user.email)

  return email ? <Layout/> : <Navigate to={PublicRoutes.REGISTER} />;
}

export default AuthGuard