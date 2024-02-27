import { useSelector } from 'react-redux'
import { RootState } from "../../store/store"
import Favorite from "./Favorite"

const Favorites = () => {
  const favorites = useSelector((state: RootState) => state.favorites)
  return (
    <>
      {favorites.length >= 1 ?
        <div className=' grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {favorites.map(product => (
            <Favorite key={product.id} product={product} />
          ))}
        </div>
        :
        <h2 className='text-2xl'>There Arent Saved Elements</h2>
      }
    </>
  )
}

export default Favorites