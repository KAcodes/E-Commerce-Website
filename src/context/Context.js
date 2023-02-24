import {createContext, useContext, useReducer} from 'react';
import { faker } from "@faker-js/faker"; 
import cartReducer, { filterReducer } from './reducers';


const Cart = createContext();

const Context = ({children}) => {

    const products = [...Array(20)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.abstract(630, 600, true),
        inStock: faker.helpers.arrayElement([0,2,4,7,11,15]),
        ratings: faker.helpers.arrayElement([1,2,3,4,5]),  
        fastDelivery: faker.datatype.boolean(),
        
    }));

    const initialCartState = {
        products: products,
        cart: []
    }
    
    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    const initialFilterState = {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: ''
    };

    const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState);

  return (
    <Cart.Provider value= {{state, dispatch, filterState, filterDispatch}}>
        {children}
    </Cart.Provider>
  )
}

export default Context

export const CartState = () => {
    return useContext(Cart)
}