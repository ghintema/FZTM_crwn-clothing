import './product-card.styles.scss';
import { useContext } from 'react';
import Button from '../button/button.component';
import { CartContext } from '../../contexts/cart.context';

function ProductCard({product}) {
    
    const { name, id, imageUrl, price } = product;
    const { addItemToCart, isCartOpen, setIsCartOpen } = useContext(CartContext);

    const addProductToCart = () => {
        addItemToCart(product)

        // if cart has not been open before, open it for a short view.
        if (!isCartOpen) {
            setIsCartOpen(true);
            setTimeout(() => setIsCartOpen(false), 2000)
        }
    }

    return ( 
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{`${price}$`}</span>

            </div>
            <Button buttonType='inverted' onClick={addProductToCart} >Add to card</Button>
        </div>
     );
}

export default ProductCard;