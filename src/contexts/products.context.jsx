import { createContext, useState} from "react";
import PRODUCTS from '../shop-data.json'


export const ProductsContext = createContext({ 
    // theese default value argument(s) are only being used, when a component does not have a matching provider.
    products: [],
})


    //Note: passing undefined as a Provider value does not cause consuming components to use defaultValue.
export const ProductsProvider = ({ children }) => {

    const [products, setProducts] = useState(PRODUCTS);
    const value = { products, setProducts }
    return <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>

}