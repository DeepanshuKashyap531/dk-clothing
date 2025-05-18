import {  useEffect} from "react";
import { onAuthChangedListner ,createUserDocumentFromAuth} from "./utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";


import Home from './routes/home/home.component'
import { Routes,Route } from 'react-router-dom';
import Navigation  from './routes/navigation/navigation.components';
import SignIn from './routes/authentication/authentication.components';
import Shop from './routes/shop/shop.component';
import CheckOut from './Component/cheackOut/cheackOut.component';
import { setCurrentUser } from "./store/user/user.action";


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
  const unsubscribe = onAuthChangedListner(async (user) => {
    try {
      if (user) {
        await createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    } catch (error) {
      console.error("Auth callback error:", error);
    }
  });

  return unsubscribe;
}, [dispatch]);

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
