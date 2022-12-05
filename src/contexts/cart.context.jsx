import { createContext, useEffect, useState } from "react";

// const addCartItem = (cartItems, productToAdd) => {

//     const cartItemsCopy = [...cartItems];
//     const index = cartItems.findIndex((item) => item.id === productToAdd.id);

//     if (index >= 0) {
//         cartItemsCopy[index].quantity = cartItemsCopy[index].quantity + 1; 
//         return [...cartItemsCopy]
//     }
//     // if productToAdd doesn't yet exist, create it with quantity = 1
//     return [...cartItems, {...productToAdd, quantity: 1}]
// }

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
})


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartSum, setCartSum] = useState(0);

    const addItemToCart = (productToAdd) => {

        const cartItemsCopy = [...cartItems];
        const index = cartItems.findIndex((item) => item.id === productToAdd.id);
    
        if (index >= 0) {
            cartItemsCopy[index].quantity = cartItemsCopy[index].quantity + 1; 
            setCartItems([...cartItemsCopy]);
            return;
        }
        // if productToAdd doesn't yet exist, create it with quantity = 1
        setCartItems([...cartItems, {...productToAdd, quantity: 1}])
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = cartItems.filter(product => product.id != productToRemove.id);
        setCartItems(newCartItems);
    };

    const changeCartItemQuantity = (productToChange, value) => {
        const cartItemsCopy = [...cartItems];
        const index = cartItems.findIndex((item) => item.id === productToChange.id);
        cartItemsCopy[index].quantity = Math.max(cartItemsCopy[index].quantity + value, 0);
        // if(cartItemsCopy[index].quantity === 0) {
        //     removeItemFromCart(productToChange);
        //     return;
        // }
        setCartItems(cartItemsCopy)
    }

    useEffect(() => {
        const total = cartItems.reduce((accumulator, current) => accumulator + current.quantity, 0);
        setCartCount(total);
    },[cartItems])


    useEffect(() => {
        const sum = cartItems.reduce((accumulator, current) => accumulator + (current.quantity * current.price), 0);
        setCartSum(sum);
    },[cartItems])
    
    const value = { isCartOpen, 
                    setIsCartOpen, 
                    cartItems, 
                    addItemToCart, 
                    cartCount,
                    cartSum, 
                    changeCartItemQuantity, 
                    removeItemFromCart}

    return <CartContext.Provider value={value} >{children}</CartContext.Provider>
}

