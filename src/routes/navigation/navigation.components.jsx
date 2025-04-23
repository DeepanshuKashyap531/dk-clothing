import { Outlet } from 'react-router-dom';
import { useState, useContext, Fragment } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import CartIcon from '../../Component/cart-icon/cart-icon.component';
import CartDropdown from '../../Component/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import { SignOutUser } from '../../utils/firebase/firebase.utils';

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  NavLinkSpan,
  LogoContainer,
  MenuIcon,
} from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>

        <MenuIcon onClick={toggleMenu}>☰</MenuIcon>

        <NavLinks className={menuOpen ? 'open' : ''}>
          <NavLink to="/shop" onClick={() => setMenuOpen(false)}>
            SHOP
          </NavLink>

          {currentUser ? (
            <NavLinkSpan onClick={() => { SignOutUser(); setMenuOpen(false); }}>
              SIGN OUT
            </NavLinkSpan>
          ) : (
            <NavLink to="/auth" onClick={() => setMenuOpen(false)}>
              SIGN IN
            </NavLink>
          )}

          <div onClick={() => setMenuOpen(false)}>
            <CartIcon />
          </div>
        </NavLinks>

        {isCartOpen && <CartDropdown />}
      </NavigationContainer>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
