import { Fragment, useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { useParams } from 'react-router-dom';
import './category.styles.scss';



function Category() {

    const { categoriesMap } = useContext(CategoriesContext)
    const { category } = useParams(); 
    const [products, setProducts] = useState(false);

    useEffect(() => {
        setProducts(categoriesMap[category])
    },[categoriesMap, Category])

    return ( 
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {products &&      
                    products.map(product => <ProductCard key={product.id} product={product} />)
                }
            </div>
        </Fragment>
     );
}

export default Category;