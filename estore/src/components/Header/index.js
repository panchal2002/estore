import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from './../../redux/User/user.actions';
import { selectCartItemsCount } from './../../redux/Cart/cart.selectors';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import './styles.scss';

import Logo from './../../assets/logo.png';

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state)
});

const Header = props => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, totalNumCartItems } = useSelector(mapState);

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  useEffect(() => {
    setActiveMenu(false);
  }, [location]);

  return (
    <header className="header">
      <div className="wrap">
        <div className="logoH"></div>
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="SimpleTut LOGO" />
          </Link>
        </div>
        {/* <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div> */}

        <nav className={sidebar ? 'nav-menu NavActive' : 'nav-menu'}>
          <div className={`nav mainMenu ${activeMenu ? 'active' : ''}`}>
            <ul>
              <li>
                <Link to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          <div className="callToActions">

            <ul>
              <li>
                <Link to="/cart">
                  Your Cart ({totalNumCartItems})
                  <FaIcons.FaShoppingCart className="icons" />
                </Link>
              </li>

              {currentUser && [
                <li key={1} className="hideOnMobile">
                  <Link to="/dashboard">
                    My Account
                    <FaIcons.FaUserCircle className="icons" />
                  </Link>
                </li>,
                <li key={2}>
                  <span onClick={() => signOut()}>
                    LogOut
                    <FaIcons.FaSignOutAlt className="icons" />
                  </span>
                </li>
              ]}

              {!currentUser && [
                <li key={1} className="hideOnMobile">
                  <Link to="/registration">
                    Register
                  </Link>
                </li>,
                <li key={2}>
                  <Link to="/login">
                    login
                    <FaIcons.FaUserCircle className="icons" />
                  </Link>
                </li>
              ]}

              <li className="mobileMenu">
                <span onClick={() => setActiveMenu(!activeMenu)}>
                  <FaIcons.FaBars className="icons" />
                </span>
              </li>
            </ul>

          </div>
        </nav>
      </div>

    </header>
  );
};

Header.defaultProps = {
  currentUser: null
};

export default Header;
