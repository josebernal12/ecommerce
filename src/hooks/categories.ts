import { IProducts } from "../models/products.interface";

export const sumValueCategories = (products: IProducts[], name: string) => {
  const productsFilter = products.filter(product => product.category === name);
  return productsFilter.length
}