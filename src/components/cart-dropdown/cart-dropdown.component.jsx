import './cart-dropdown.styles.scss'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext, cartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component'

function CartDropdown() {

    const { cartItems, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();
    
    const goToCheckoutHandler = () => {
        // navigate('/checkout');
        navigate(`${process.env.REACT_APP_deployPath}/checkout`)
        setIsCartOpen(false);
    }


    return ( 
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length ? 
                    cartItems.map(item => <CartItem key={item.id} cartItem={item}/>) 
                    : <span className='empty-cart-message'>Your Cart is empty</span> }
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
     );
}

export default CartDropdown;