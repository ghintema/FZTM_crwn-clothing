import { createContext, useState, useEffect} from "react";
import SHOP_DATA from '../shop-data.js'
import PRODUCTS from '../shop-data.json'
import { getCategoriesAndDocumentsFromFirestore } from '../utils/firebase/firebase.utils'

// console.log(PRODUCTS)
// console.log(SHOP_DATA[0].items)

export const CategoriesContext = createContext({ 
    // theese default value argument(s) are only being used, when a component does not have a matching provider.
    categoriesMap: {},
})


    //Note: passing undefined as a Provider value does not cause consuming components to use defaultValue.
export const CategoriesProvider = ({ children }) => {

    const [categoriesMap, setCategoriesMap] = useState({});

    // useEffect(() => {
    //     // setting the database with data is normally not done from front-end and need be done only once ever.
    //     addCollectionAndDocumentsToFirestore('categories', SHOP_DATA)
    // },[])


    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocumentsFromFirestore();
            console.log(categoryMap)
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
    },[])
    console.log(categoriesMap)
    const value = { categoriesMap, setCategoriesMap }
    return <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>

}