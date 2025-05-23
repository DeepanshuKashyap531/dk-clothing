import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';



const middleWare = [logger];


const composedEnhancers = compose(applyMiddleware(...middleWare))
// root-reducer
export const store = createStore(rootReducer,undefined,composedEnhancers)