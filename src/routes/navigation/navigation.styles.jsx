import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  flex-wrap: wrap;
  border-bottom: 1px solid #eaeaea;
`;

export const LogoContainer = styled(Link)`
  width: 100px;
`;

export const MenuIcon = styled.div`
  display: none;
  font-size: 28px;
  cursor: pointer;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.4s ease;
    gap: 0;
    padding: 0;

    &.open {
      max-height: 500px;
      gap: 10px;
      padding: 10px 0;
    }
  }
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;

  @media (max-width: 1024px) {
    padding: 12px 20px;
    width: 100%;
  }
`;

export const NavLinkSpan = styled.span`
  padding: 10px 15px;
  cursor: pointer;

  @media (max-width: 1024px) {
    padding: 12px 20px;
    width: 100%;
  }
`;
