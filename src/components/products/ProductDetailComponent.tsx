import { IProducts } from "../../models/products.interface"
import { toast } from 'sonner'
import { useDispatch, useSelector } from "react-redux";
import { addCart, deleteCart, getNumberCart } from "../../store/slices/CartSlice";
import { RootState } from "../../store/store";
interface Props {
  product: IProducts;
  priceByQuality: number;
  quantity: number;
  validQuantityAdd: boolean;
  changeButton: boolean;
  setChangeButton: React.Dispatch<React.SetStateAction<boolean>>
  reduceQuantity: () => void
  addQuantity: () => void
}
const ProductDetailComponent = ({ product, priceByQuality, quantity, validQuantityAdd, changeButton, setChangeButton, reduceQuantity, addQuantity }: Props) => {
  const dispatch = useDispatch()
  const cart = useSelector((state: RootState) => state.cart.products)
  const onAddCart = async () => {
    const localStorageProducts = localStorage.getItem('cart')
    if (localStorageProducts) {
      const localStorageParse: IProducts[] = JSON.parse(localStorageProducts)
      if (localStorageParse.some(value => value.id === product.id)) {
        dispatch(deleteCart(product.id))
        dispatch(getNumberCart())
        const productUpdate = localStorageParse.filter(value => value.id !== product.id)
        localStorage.setItem('cart', JSON.stringify(productUpdate))
        toast.error('Product Deleted in Cart')
        setChangeButton(false)
      } else {
        dispatch(addCart({ name: product.name, price: priceByQuality, stock: quantity, category: product.category, id: product.id, image: product.image, available: product.available }))
        dispatch(getNumberCart())
        localStorage.setItem('cart', JSON.stringify([...localStorageParse, { name: product.name, price: priceByQuality, stock: quantity, category: product.category, id: product.id, image: product.image, available: product.available }]))
        toast.success('Product added in Cart')
        setChangeButton(true)
      }
    } else {
      localStorage.setItem('cart', JSON.stringify([{ name: product.name, price: priceByQuality, stock: quantity, category: product.category, id: product.id, image: product.image, available: product.available }]))
      dispatch(addCart(product))
      dispatch(getNumberCart())
      setChangeButton(true)
      toast.success('Product added in Cart')

    }

  }
  return (
    <div className="flex flex-col items-start">
      <div className="flex justify-between gap-4 items-center">
        <h2 className="text-3xl mb-3">{product.name} </h2>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </div>
      <p className="text-xl mb-3 text-blue-500">Category: {product.category}</p>
      <div className="border-t border-gray-400 pt-3 w-full mt-5">
        <p className="font-bold text-3xl text-start mt-2">${priceByQuality}</p>
      </div>
      {cart.some(value => value.id === product.id) ? <p className="mt-3">product added a cart (you can change quantity in cart)</p> : (
        <div className="flex mt-8 gap-4 flex-col items-start  ">
          <p className="m-0 text-xl">Quantity:</p>
          <div className="w-72 grid grid-cols-3 justify-center items-center border border-gray-200 rounded-md dark:border-gray-800">
            <button disabled={quantity === 1 ? true : false} onClick={() => reduceQuantity()} className="p-5 mx-auto">
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
            <span className="text-xl font-semibold">{quantity} </span>
            <button disabled={validQuantityAdd ? true : false} onClick={() => addQuantity()} className="p-5 mx-auto">
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
        </div>
      )}
      <div className="mt-10 flex items-start text-start border-t border-gray-400 pt-3 w-full  ">
        <p>Description: Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Fuga eaque rem recusandae fugit officia molestias nisi illo tempore dignissimos
          ex
          a dolorum nostrum magni dolorem ullam vel iure, culpa cumque?</p>
      </div>
      <div className="mt-5">
        <h3 className="text-2xl">Method of Payment</h3>
        <div className="flex gap-3  mt-3">
          <div>
            <p>Debit Card</p>
            <img className="w-16 mt-3" src="../../../public/debit-card.png" alt="imagen de debito" />
          </div>
          <div>
            <p>Paypal</p>
            <img className="w-16 mt-3" src="../../../public/paypal2.png" alt="imagen paypal" />
          </div>

        </div>
      </div>
      <div className="mt-5 grid md:grid-cols-2 w-full gap-3">
        <button onClick={() => { onAddCart() }} className={`${changeButton ? 'bg-red-700 hover:bg-red-600' : 'bg-green-700 hover:bg-green-600'} uppercase font-bold  p-2 rounded-lg text-white `} >{changeButton ? 'Remove Cart' : 'Add Cart'} </button>
        <button className="text-white uppercase font-bold bg-blue-700 p-2 rounded-lg hover:bg-blue-600">Buy</button>
      </div>
    </div>
  )
}

export default ProductDetailComponent