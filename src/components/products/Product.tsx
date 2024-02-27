/* eslint-disable react-hooks/exhaustive-deps */
import { IProducts } from "../../models/products.interface"
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, deleteFavorites } from "../../store/slices/FavoritesSlices"
import { RootState } from '../../store/store';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  product: IProducts
}
const Product = ({ product }: Props) => {
  const dispatch = useDispatch()
  const productsFavorite = useSelector((state: RootState) => state.favorites)
  const [exec, setExec] = useState(false)
  useEffect(() => {
    const favoriteLocalStorage = localStorage.getItem('favorites')
    if (favoriteLocalStorage) {
      const favoriteParse: IProducts[] = JSON.parse(favoriteLocalStorage)
      favoriteParse.forEach(value => {
        if (value.id === product.id) {
          setExec(true)
        }
      })
    }
  }, [exec])

  const handleFavorites = (product: IProducts) => {
    const existingItem = productsFavorite.find(item => item.id === product.id);
    if (!existingItem) {
      dispatch(addFavorite(product))
      setExec(true)
    } else {
      setExec(false)
      dispatch(deleteFavorites(product.id))

    }
  }
  return (
    <div className=" rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <Link to={`product/${product.id}`} className="aspect-card overflow-hidden rounded-t-lg hover:cursor-pointer">
        <img
          src={product.image}
          width="400"
          height="500"
          alt="Product image"
          className="object-cover"
          style={{ aspectRatio: 400 / 500, objectFit: 'cover' }}
        />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-base">{product.name} </h3>
        <p className="font-semibold text-sm">${product.price} </p>
        <div className="flex items-center gap-1 justify-between">
          <div className="flex">
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
              className="w-4 h-4 fill-current"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
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
              className="w-4 h-4 fill-current"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
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
              className="w-4 h-4 fill-current"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
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
              className="w-4 h-4 fill-current"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
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
              className="w-4 h-4 fill-current"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span className="text-xs"> ({product.stock})</span>
          </div>
          <svg onClick={() => handleFavorites(product)} xmlns="http://www.w3.org/2000/svg" fill={`${exec ? 'solid' : 'none'}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>

        </div>
      </div>
    </div>
  )
}

export default Product