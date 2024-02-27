/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Toaster } from 'sonner'
import { getProductById, relatedContent, setHiddenValue } from "../../store/slices/ProductSlice"
import { RootState } from "../../store/store"
import RelatedProducts from "../../components/related-products/RelatedProducts"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductDetailComponent from "../../components/products/ProductDetailComponent"
import { IProducts } from "../../models/products.interface"
//TODO PENSAR SOBRE LOS CUPONES

const ProductDetail = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const product = useSelector((state: RootState) => state.product.product)
  const relateProducts = useSelector((state: RootState) => state.product.relatedProducts)
  const charging = useSelector((state: RootState) => state.product.charging)
  const [quantity, setQuantity] = useState<number>(1)
  const [priceByQuality, setPriceByQuality] = useState<number>(0)
  const [validQuantityAdd, setValidQuantityAdd] = useState(false)
  const [stockQuantity, setStockQuantity] = useState(0)
  const { id } = params
  const [indexFirst, setIndexFirst] = useState<number>(0)
  const [indexLast, setIndexLast] = useState<number>(5)
  const [animateBackInLeft, setAnimateBackInLeft] = useState(false);
  const [animateBackInRight, setAnimateBackInRight] = useState(false);
  const [changeButton, setChangeButton] = useState<boolean>(false)
  let relatedProductsFive = relateProducts.slice(indexFirst, indexLast)

  useEffect(() => {
    if (id) {
      dispatch(setHiddenValue(true))
      dispatch(getProductById(Number(id)))

    }
  }, [])
  useEffect(() => {
    if (charging) {
      dispatch(relatedContent({ name: product.name, category: product.category }))
      setPriceByQuality(product.price)
      setStockQuantity(product.stock)
      if (product.stock === quantity) {
        setValidQuantityAdd(true)
      } else {
        setValidQuantityAdd(false)
      }
    }
  }, [product])

  useEffect(() => {
    setPriceByQuality(product.price * quantity)
    setStockQuantity(product.stock - quantity)
    if (product.stock === quantity) {
      setValidQuantityAdd(true)
    } else {
      setValidQuantityAdd(false)
    }
  }, [quantity])

  useEffect(() => {
    dispatch(getProductById(Number(id)))
    setQuantity(1)
    const cartLocalStorage = localStorage.getItem('cart')
    if (cartLocalStorage) {
      const cartLocalStorageParse: IProducts[] = JSON.parse(cartLocalStorage)
      if (id) {
        if (cartLocalStorageParse.some(value => value.id === Number(id))) {
          setChangeButton(true)
        } else {
          setChangeButton(false)
        }
      }
    }
  }, [id])
  useEffect(() => {
    relatedProductsFive = relateProducts.slice(indexFirst, indexLast)
  }, [indexLast])
  const addQuantity = () => setQuantity(quantity + 1)

  const reduceQuantity = () => setQuantity(quantity - 1)

  const showContentRelated = () => {
    setIndexLast(indexLast + 5)
    setIndexFirst(indexFirst + 5)
    setAnimateBackInLeft(true);
    setTimeout(() => {
      setAnimateBackInLeft(false);
    }, 1000);
  }

  const backContentRelated = () => {
    setIndexLast(indexLast - 5)
    setIndexFirst(indexFirst - 5)
    setAnimateBackInRight(true);
    setTimeout(() => {
      setAnimateBackInRight(false);
    }, 1000);
  }
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative w-500 h-500">
          <p className="absolute top-0 left-0 font-bold m-4 bg-white bg-opacity-75 px-2 py-1 rounded">STOCK: {stockQuantity}</p>
          <img className="h-full object-cover" src={product.image} alt="image product " />
        </div>
        <ProductDetailComponent product={product} priceByQuality={priceByQuality} quantity={quantity} validQuantityAdd={validQuantityAdd} reduceQuantity={reduceQuantity} addQuantity={addQuantity} changeButton={changeButton} setChangeButton={setChangeButton} />
      </div>
      <div >
        <h2 className="text-start text-2xl mb-5">Contenido Relacinado:</h2>
        <div className="flex gap-3">
          {indexFirst !== 0 && (
            <button className="transition-transform duration-300 hover:scale-110 focus:outline-none" onClick={() => backContentRelated()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </button>
          )}

          <div className={`grid md:grid-cols-5 ${animateBackInLeft && 'animate__animated animate__slideInRight'} ${animateBackInRight && 'animate__animated animate__slideInLeft'}`}>
            {relatedProductsFive.map(product => (
              <RelatedProducts key={product.id} product={product} />
            ))}
          </div>
          {indexLast < relateProducts.length && (
            <button onClick={() => showContentRelated()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          )}

        </div>
      </div>
    </>

  )
}

export default ProductDetail