/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Aside from '../../components/aside/Aside'
import Pagination from '../../components/pagination/Pagination'
import Products from '../../components/products/Products'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { pagination } from '../../store/slices/ProductsSlices';
import { setHiddenValue } from '../../store/slices/ProductSlice';

//TODO REVISAR LO DEL  NAME EN  VEZ DEL ID DE LA DATA CONTENTRELATED
const Home = () => {
  const currentsItems = useSelector((state: RootState) => state.products.productsPaginator)
  const numberPage = useSelector((state: RootState) => state.products.numberPage)
  const productsFilter = useSelector((state: RootState) => state.products.productsFilter)

  const dispatch = useDispatch()
  const [itemsPerPage] = useState(10);
  const [previous, setPrevious] = useState<number>(1)
  const [next, setNext] = useState<number>(1)
  useEffect(() => {
    if (numberPage >= 1) {
      setNext(numberPage + 1)
      setPrevious(numberPage - 1)
    }
  }, [numberPage])
  useEffect(() => {
    dispatch(setHiddenValue(false))
  }, [])
  const paginate = (pageNumber: number) => {
    dispatch(pagination({ indexOfFirstItem: (pageNumber - 1) * itemsPerPage, indexOfLastItem: pageNumber * itemsPerPage, numberPage: pageNumber }))
  };

  return (
    <>
      <Aside />
      <Products currentsItems={currentsItems} />
      <Pagination previous={previous} next={next} itemsPerPage={itemsPerPage} totalItems={productsFilter.length} paginate={paginate} />
    </>
  )
}

export default Home