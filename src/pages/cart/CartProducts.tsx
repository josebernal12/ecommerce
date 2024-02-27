import { Link } from "react-router-dom"
import { IProducts } from "../../models/products.interface"
import { useDispatch, useSelector } from "react-redux"
import { deleteCart, updateCart } from "../../store/slices/CartSlice"
import { RootState } from "../../store/store"
import { useEffect, useState } from "react"

interface Props {
  product: IProducts
}
const CartProducts = ({ product }: Props) => {
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products.products)
  const [productOriginal, setProductOriginal] = useState<IProducts>()
  const onUpdateCart = (operation: string) => {
  
    if (operation === 'sum') {
      dispatch(updateCart({ stock: product.stock + 1, id: product.id }))
    } else {
      dispatch(updateCart({ stock: product.stock - 1, id: product.id }))
    }
  }
  const onDeleteCart = () => {
    const cartLocalStorage = localStorage.getItem('cart')
    if (cartLocalStorage) {
      const cartlocalStorageParse: IProducts[] = JSON.parse(cartLocalStorage)
      const updateCart = cartlocalStorageParse.filter(value => value.id !== product.id)
      localStorage.setItem('cart', JSON.stringify(updateCart))
      dispatch(deleteCart(product.id))
    }
  }
  useEffect(() => {
    if (products) {
      const productOriginal = products.find(value => {
        if (value.id === product.id) {
          return value.stock
        }
      })
      setProductOriginal(productOriginal)
    }
  }, [])
  return (
    <div className="flex items-center p-2 justify-around border-y-2">
      <Link to={`/product/${product.id}`}>
        <img className="w-32 rounded-lg" src={product.image} alt="product cart" />
      </Link>
      <div>
        <p className="text-start font-bold">{product.name} </p>
        <div className="flex gap-5">
          <button onClick={onDeleteCart} className="text-red-800 font-bold hover:text-red-600">Eliminar</button>
          <button className="text-blue-800 font-bold hover:text-blue-600">Comprar</button>
        </div>
      </div>
      <div className="w-32 grid grid-cols-3 justify-center items-center border border-gray-200 rounded-md dark:border-gray-800">
        <button disabled={product.stock === 1 ? true : false} onClick={() => onUpdateCart('res')} className="p-3 mx-auto">
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
            <path d="M5 12h14"></path>
          </svg>
        </button>
        <span className="text-xl font-semibold">{product.stock} </span>
        <button disabled={productOriginal?.stock === product.stock ? true : false} onClick={() => onUpdateCart('sum')} className="p-3 mx-auto">
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
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>

          </svg>
        </button>
      </div>
      <p className="font-bold text-xl">${product.price} </p>
    </div>
  )
}

export default CartProducts