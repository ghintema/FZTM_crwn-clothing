import './cart-icon.styles.scss'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'


function CartIcon() {

    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    
    
    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }

    return ( 
        <button className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </button>
     );
}

export default CartIcon;