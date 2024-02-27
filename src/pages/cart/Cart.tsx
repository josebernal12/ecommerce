/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import CartProducts from "./CartProducts"
import { useEffect } from "react"
import { sumTotal } from "../../store/slices/CartSlice"

const Cart = () => {
  const productsCart = useSelector((state: RootState) => state.cart.products)
  const total = useSelector((state: RootState) => state.cart.total)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(sumTotal(productsCart))
  }, [productsCart])

  return (
    <div className="grid md:grid-cols-8 gap-2 auto-rows-auto">
      <div className=" rounded-lg col-span-5 h-auto">
        <h2 className="font-bold text-2xl text-start p-5">Cart</h2>
        <div>
          {productsCart.map(product => (
            <CartProducts key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className=" rounded-lg col-span-3 p-3 h-56">
        <h2 className="font-bold text-2xl text-start">Resume Cart</h2>
        <p className="text-start mt-4 font-bold">Products ({productsCart.length})</p>
        <p className="text-start mt-2 font-bold">Total ${total} </p>
        <button className="w-full mt-3 text-white uppercase font-bold bg-blue-700 p-2 rounded-lg hover:bg-blue-600">Buy</button>

      </div>
    </div>
  )
}

export default Cart