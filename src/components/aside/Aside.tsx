import { useDispatch, useSelector } from "react-redux"
import { filterProducts, getProductsByCategories } from "../../store/slices/ProductsSlices"
import { useEffect, useState } from "react"
import { RootState } from "../../store/store"
import { sumValueCategories } from '../../hooks/categories';

const Aside = () => {
  const dispatch = useDispatch()
  const [select, setSelect] = useState<number>(0)
  const [selectCategory, setSelectCategory] = useState<string | null>()
  const products = useSelector((state: RootState) => state.products.products)
  const categories = products.map(product => product.category)
  const categoriesWithoutRepit = new Set(categories)
  const categoriesArray = [...categoriesWithoutRepit]
  const handleFiltersProducts = (id: number) => {
    dispatch(filterProducts(id))
    setSelect(id)
    setSelectCategory("")
    localStorage.setItem('category', '')

  }
  useEffect(() => {
    const receivedSelect = localStorage.getItem('filter')
    const receivedSelectCategory = localStorage.getItem('category')
    if (receivedSelectCategory === '') {
      setSelect(Number(receivedSelect))
    }
    if (receivedSelect === '') {
      if (receivedSelectCategory) {
        const selectCategoryParse = JSON.parse(receivedSelectCategory)
        setSelectCategory(selectCategoryParse)
      }

    }
  }, [])

  const filterByCategory = (name: string) => {
    setSelectCategory(name)
    setSelect(0)
    dispatch(getProductsByCategories(name))
    localStorage.setItem('filter', '')
    localStorage.setItem('category', JSON.stringify(name))
  }
  return (
    <aside className="hidden w-full border md:w-[300px] lg:block">
      <div className="sticky top-14">
        <nav className="flex flex-col gap-1 p-4 text-sm font-medium">
          <button
            onClick={() => handleFiltersProducts(1)}
            className={`${select === 1 ? 'bg-gray-100  dark:bg-gray-800 dark:text-gray-50' : ''} flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500  transition-all `}
          >
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
              className="h-4 w-4"
            >
              <path d="m7.5 4.27 9 5.15"></path>
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
              <path d="m3.3 7 8.7 5 8.7-5"></path>
              <path d="M12 22V12"></path>
            </svg>
            All Products
          </button>
          <button
            onClick={() => handleFiltersProducts(2)}
            className={`${select === 2 ? 'bg-gray-100  dark:bg-gray-800 dark:text-gray-50' : ''} flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500  transition-all `}
          >
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
              className="h-4 w-4"
            >
              <path d="m6 17 5-5-5-5"></path>
              <path d="m13 17 5-5-5-5"></path>
            </svg>
            New Products
          </button>
          <button
            onClick={() => handleFiltersProducts(3)}
            className={`${select === 3 ? 'bg-gray-100  dark:bg-gray-800 dark:text-gray-50' : ''} flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500  transition-all `}
          >
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
              className="h-4 w-4"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
            Populars
          </button>
          <button
            onClick={() => handleFiltersProducts(4)}
            className={`${select === 4 ? 'bg-gray-100  dark:bg-gray-800 dark:text-gray-50' : ''} flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500  transition-all `}
          >
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
              className="h-4 w-4"
            >
              <line x1="12" x2="12" y1="2" y2="22"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Discounts
          </button>
        </nav>
        <div className="border-t border-gray-200 dark:border-gray-800"></div>
        <div className="flex flex-col gap-2 p-4">
          <h3 className="font-semibold text-base">Categories</h3>
          <ul className="grid gap-2 text-sm">
            {categoriesArray.map((category, index) => (
              <li key={index}>
                <button onClick={() => filterByCategory(category.toLowerCase())}
                  className={`${selectCategory === category ? 'bg-gray-100  dark:bg-gray-800 dark:text-gray-50 rounded-lg ' : ''} flex items-center gap-3 text-gray-500 transition-all  dark:text-gray-400 w-full`}
                >
                  {category} <span className="ml-auto">({sumValueCategories(products, category)})</span>
                </button>
              </li>

            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Aside