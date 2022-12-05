import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';


function CheckoutItem({ cartItem }) {

    const { name, imageUrl, price, quantity } = cartItem
    const { removeItemFromCart, changeCartItemQuantity } = useContext(CartContext);

    const removeItemHandler = () => removeItemFromCart(cartItem); 
    const increaseItemHandler = () => changeCartItemQuantity(cartItem, 1)
    const decreaseItemHandler = () => changeCartItemQuantity(cartItem, -1)

    return ( 
        <div className="checkout-item-container">
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name' aria-label='product'>{name}</span>
            <div className='quantity' >
                <button 
                    className='arrow' 
                    onClick={decreaseItemHandler}
                    aria-label='decrease amount'>
                    &#10094;
                </button>
                    <span className='value' aria-label='quantity'>{quantity}</span>
                <button 
                    className='arrow' 
                    onClick={increaseItemHandler}
                    aria-label='increase amount'>
                    &#10095;
                </button>
            </div>
            <span className='price' aria-label='price'>{price}$</span>
            <button 
                className='remove-button'
                onClick={removeItemHandler}
                aria-label='remove item from cart'>
                    &#10005;</button>
        </div>
     );
}

export default CheckoutItem;