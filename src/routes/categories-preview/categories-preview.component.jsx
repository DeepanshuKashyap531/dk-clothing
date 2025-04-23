import  {useContext ,Fragment} from 'react';

import { CategoriesContext } from '../../context/categories.context';
import CategoryPreview from '../../Component/category-preview/category-preview.component';

const CategoriesPreiew = () => {
    const {categoriesMap} = useContext(CategoriesContext)
    return (
        <Fragment>
        { Object.keys(categoriesMap).map((title) =>{ 
                const products = categoriesMap[title];
                return (
                <CategoryPreview key={title} products={products} title={title}/>
                );
        })}
        </ Fragment>
    );
};


export default CategoriesPreiew;