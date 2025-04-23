import Home from './routes/home/home.component'
import { Routes,Route } from 'react-router-dom';
import Navigation  from './routes/navigation/navigation.components';
import SignIn from './routes/authentication/authentication.components';
import Shop from './routes/shop/shop.component';
import CheckOut from './Component/cheackOut/cheackOut.component';


const App = () => {
return(
 <Routes>
  <Route path='/' element={<Navigation />}>
    <Route index element={<Home />} />
    <Route path = 'shop/*' element={<Shop />} />
    <Route path = 'cheackout' element={<CheckOut />} />
    <Route path='auth' element={<SignIn />}/>
  </Route>
 </Routes>
  );
}
export default App;
