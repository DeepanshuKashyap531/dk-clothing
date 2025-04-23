import { useParams } from 'react-router-dom'; // allow us to get values from the another routes
import { useContext , useState , useEffect, Fragment } from 'react';

import ProductCard from '../../Component/product_card/product_card.component';
import { CategoriesContext } from '../../context/categories.context';

import './category.styles.scss'

const Category = () =>{
      const {category} = useParams();
      const {categoriesMap} = useContext(CategoriesContext);
      const [products,setproducts] = useState(categoriesMap[category]);

      useEffect(() => {
        setproducts(categoriesMap[category]);

      },[category,categoriesMap]);

      return(
        <Fragment>
          <h2 className='category-title'>{category.toUpperCase()}</h2>
          <div className='category-container'>
          
          {products && 
              products.map((product) =>(
                  <ProductCard key={product.id} product={product} />)
              ) 
          }
      </div>
        </Fragment>  
      )
};

export default Category;