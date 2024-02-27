import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { searchProduct } from "../../store/slices/ProductsSlices"
import { RootState } from "../../store/store"
import { logout } from "../../store/slices/AuthSlice"

const Navegation = () => {
  const [search, setSearch] = useState<string>("")
  const hiddenNav = useSelector((state: RootState) => state.product.hiddenNav)
  const dispatch = useDispatch()
  const totalProducts = useSelector((state: RootState) => state.cart.totalProducts)
  const user = useSelector((state: RootState) => state.user)
  const onSearchProduct = () => {
    dispatch(searchProduct(search))
  }
  const onLogout = () => {
    dispatch(logout())
  }
  return (
    <header className="flex items-center h-14 border-b gap-4 lg:h-[60px] px-6">
      <nav className="hidden lg:flex flex-1 items-center gap-4 text-sm font-medium">
        <Link to={'/'} className="font-semibold hover:underline">
          Home
        </Link>
        <Link to={'/favorites'} className="hover:underline">Favorites</Link>
        <Link to={'#'} className="hover:underline">Profile</Link>

      </nav>

      <div className="ml-auto flex items-center gap-4">
        {!hiddenNav && (
          <form onKeyUp={onSearchProduct} className="hidden lg:block">
            <div className="relative">

              <input
                className="flex bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[200px] h-8 shadow-none border border-gray-200 rounded-lg dark:border-gray-800"
                placeholder="Search..."
                type="search"
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>
          </form>
        )}
        {user.id ? (
          <button onClick={() => onLogout()} title="logout">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </button>
        ) : (
          <>
            <Link to='/login' className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-8">
              Sign in
            </Link>
            <Link to='/register' className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-8">
              Sign up
            </Link>
          </>
        )}
        <Link title="cart" to='/cart' className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-8 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
          {totalProducts > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-2 bg-red-500 text-white text-xs font-bold rounded-full p-1">{totalProducts}</span>
          )}
          <span className="sr-only">Toggle cart</span>
        </Link>
        <button title="notification">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>

        </button>
      </div>
    </header>
  )
}

export default Navegation