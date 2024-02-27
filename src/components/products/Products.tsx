import Product from "./Product"
import { IProducts } from "../../models/products.interface";
import { useSelector } from "react-redux";
import { RootState } from '../../store/store';
interface Props {
  currentsItems: IProducts[]
}
const Products = ({ currentsItems }: Props) => {
  const productsSearch = useSelector((state: RootState) => state.products.productsSearch)
  const message = useSelector((state: RootState) => state.products.message)
  return (
    <div className={`${message ? 'xl:grid-col-3' : 'xl:grid-cols-4'} grid gap-4 md:grid-cols-2 lg:grid-cols-3 `}>
      {
        message
          ? <div className="col-start-2 mt-5 flex gap-1 justify-center">
            <h2 className="">{message}</h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
            </svg>

          </div>
          : productsSearch.length >= 1
            ? <>
              {productsSearch.map(product => (
                <Product key={product.id} product={product} />
              ))}
            </>
            : <>
              {currentsItems.map(product => (
                <Product key={product.id} product={product} />
              ))}
            </>
      }
    </div>
  )
}

export default Products