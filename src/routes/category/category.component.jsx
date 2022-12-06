import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { useParams } from 'react-router-dom';
import './category.styles.scss';



function Category() {

    const { categoriesMap } = useContext(CategoriesContext)
    const { category } = useParams(); 
    const [products, setProducts] = useState(false);
    console.log(category)
    console.log(categoriesMap)

    useEffect(() => {
        setProducts(categoriesMap[category])
    },[categoriesMap, Category])

    console.log(products)
    return ( 
        <div className='category-container'>
            {products &&
                products.map(product => <ProductCard key={product.id} product={product} />)
            }
        </div>
     );
}

export default Category;