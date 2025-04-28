import { createContext,useReducer } from "react";
import {CreateAction} from "../utils/reducer/reducers.utlis";

const addCartItem = (cartItems,productToAdd) => {
    //find if cardItems conains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    //If Found , increment quantity

    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
        ? {...cartItem,quantity: cartItem.quantity + 1}
     : cartItem
    );
    }
    // return new array with modified cartItem/ new cart item
    return [...cartItems , {...productToAdd , quantity:1}]
} 
const removeCartItem = (cartItems , cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    //check if the quantity is equal to 1 , if it is remove that item from the cart
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    // rreturn back cartitem with matching cart item with reduced quantity
    return cartItems.map((cartItem)=> 
        cartItem.id === cartItemToRemove.id 
        ? {...cartItem,quantity: cartItem.quantity - 1 }
    : cartItem
);
}

const clearCartItem = (cartItems , cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)


export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen:  () => {},
    cartItems : [],
    addItemToCart : () => {},
    removieItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    carttotal : 0

});

// -------Reducer function starts from here -------

const CART_ACTION_TYPES = {
    SET_CART_ITEMS : 'SET_CART_ITEMS',
    SET_IS_CART_OPEN : 'SET_IS_CART_OPEN'
}
const INITIAL_STATE = {
    isCartOpen : false,
    cartCount: 0,
    cartTotal : 0,
    cartItems : []

}

const cartReducer =(state,action) => {
    const {type,payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
              ...state,
              ...payload              
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
              ...state,
              isCartOpen : payload,            
            }
        default:
            throw new Error(`unhandled type error of ${type} in CartReducer`);
    }
}

export const CartProvider = ({children}) => {

    const [{cartItems , isCartOpen ,cartCount,cartTotal},dispatch] = useReducer(cartReducer , INITIAL_STATE)

    const updateCartItmesReducer = (newCartItems) => {

        const newCartCount = cartItems.reduce((total ,cartItem) => total + cartItem.quantity , 0)

        const newCartTotal = cartItems.reduce((total ,cartItem) => total + cartItem.quantity * cartItem.price, 0)

        dispatch(
            CreateAction(CART_ACTION_TYPES.SET_CART_ITEMS ,
                {cartItems:  newCartItems,
                cartTotal:   newCartTotal ,
                cartCount:   newCartCount}))
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems,productToAdd)
        updateCartItmesReducer(newCartItems);
    };
    
    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems  = removeCartItem(cartItems, cartItemToRemove);
        updateCartItmesReducer(newCartItems);
    }
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems,cartItemToClear)
        updateCartItmesReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch( CreateAction( CART_ACTION_TYPES.SET_IS_CART_OPEN ,  bool ));
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        cartItems,
        clearItemFromCart,
        cartTotal,
        cartCount};

    return <CartContext.Provider value = {value}>{children}</CartContext.Provider>
}