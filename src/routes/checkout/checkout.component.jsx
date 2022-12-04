import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext} from '../../contexts/cart.context';
import CheckoutItem  from '../../components/checkout-item/checkout-item.component'

function Checkout() {
    
    const { cartItems, changeCartItemQuantity, addItemToCart } = useContext(CartContext);
    

    const increaseHandler = (item) => changeCartItemQuantity(item, 1);
    const decreaseHandler = (item) => changeCartItemQuantity(item, -1);

    return ( 
        <div className='checkout-container'>
            {cartItems.map(item => {
                // console.log(item)
                return (
                    <div key={item.id}> 
                        <h2>{item.name}</h2>
                        <span>{item.quantity}</span>
                        <button onClick={() => {decreaseHandler(item)}}>decrement</button> 
                        <button onClick={() => {increaseHandler(item)}}>increment</button> 
                    </div>
                    )
            } )}
            <h1>Checkout component</h1>
        </div>
     );
}

export default Checkout;