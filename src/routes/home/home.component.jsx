import { Outlet } from 'react-router-dom';
import CategoryDirectory from '../../Component/category-directory/category-directory.component'



const Home = ()=> {
    return (
        <div>
        <Outlet />
        <CategoryDirectory />       
        </div>
    ) 
  };
  

  export default Home;