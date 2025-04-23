import './checkOut.styles.scss';
import { Fragment } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import CheckoutItem from '../checkout-item/checkout.component';

const CheckOut = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Your Cart</h1>

      {cartItems.length ? (
        <Fragment>
          <div className="checkout-header">
            <div className="header-block"><span>Product</span></div>
            <div className="header-block"><span>Description</span></div>
            <div className="header-block"><span>Quantity</span></div>
            <div className="header-block"><span>Price</span></div>
            <div className="header-block"><span>Remove</span></div>
          </div>

          {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          ))}

          <span className="total">Total: ${cartTotal}</span>
        </Fragment>
      ) : (
        <span className="empty-message">Your cart is empty 😢</span>
      )}
    </div>
  );
};

export default CheckOut;
