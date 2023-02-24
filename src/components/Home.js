import React from 'react'
import { CartState } from '../context/Context'
import SingleProduct from './SingleProduct'
import "./homeStyles.css";
import Filters from './Filters';

const Home = () => {

  const { 
    state: {products},
    filterState: {byStock, byFastDelivery, sort, byRating, searchQuery}
  } = CartState()

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) => (
        sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
      ))
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((item) => item.inStock
    )}

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((item) => item.fastDelivery
    )}

    if (byRating) {
      sortedProducts = sortedProducts.filter((item) => 
      item.ratings >= byRating
    )}

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((item) => 
      item.name.toLowerCase().includes(searchQuery))}

    return sortedProducts;
  }

  return (
    <div className='home'>
      <Filters/>
      <div className='productContainer'>
        {
          transformProducts().map((product) => {
            return <SingleProduct item={product} key={product.id}/>
          })
        }
      </div>
      
    </div>
  )
}

export default Home