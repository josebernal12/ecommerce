export interface IProducts {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  available: number;
  image: string;
}

export interface InitialStateProducts {
  products: IProducts[];
  newProducts: IProducts[];
  productsDiscount: IProducts[];
  productsPopulars: IProducts[];
  productsFilter: IProducts[];
  productsBeforeFilter: IProducts[]
  productsPaginator: IProducts[];
  productsSearch: IProducts[];
  numberPage: number;
  message: string;

}

export interface InitialStateProductDetail {
  product: IProducts;
  relatedProducts: IProducts[];
  charging: boolean,
  hiddenNav: boolean
}

export interface InitalStateCart {
  products: IProducts[];
  totalProducts: number;
  charging: boolean;
  total: number;
}