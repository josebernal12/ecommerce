import { Outlet } from 'react-router-dom'
import Footer from "../footer/Footer"
import Header from "./header/Header"

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 grid gap-4 p-4 md:gap-8 md:p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout