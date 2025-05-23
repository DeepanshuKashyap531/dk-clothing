import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../context/cart.context';

import Button from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';


import {
    CartDropdownContainer,
    EmptyMessage,
    CartItems
} from './cart-dropdown.styles';


const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () =>{
        navigate('/cheackout')
    }

    return(
        <CartDropdownContainer className='cart-dropdown-container'>
            <CartItems className='cart-item'>
                {
                    cartItems.length ?( cartItems.map((item) => <CartItem key = {item.id} cartItem = {item}/>) 
                    ) : (
                        <EmptyMessage>Your Cart Is Empty</EmptyMessage>
                    )
                }

            </CartItems>
          <Button onClick={goToCheckoutHandler}>Go To CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;