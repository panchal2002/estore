import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from './../../redux/User/user.actions';
import { selectCartItemsCount } from './../../redux/Cart/cart.selectors';
import { selectWishlistItemsCount, selectWishlistItems } from '../../redux/Wishlist/wishlist.selectors';
import { createStructuredSelector } from 'reselect';
import * as FaIcons from 'react-icons/fa';
import Wishlist from '../WishList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { checkUserIsAdmin } from './../../Utils';
import './styles.scss';

import Logo from './../../assets/logo.png';

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
  totalNumWishlistItems: selectWishlistItemsCount(state)
});


const mapWishlistState = createStructuredSelector({
  wishlistItems: selectWishlistItems
});

const Header = props => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, totalNumCartItems, totalNumWishlistItems } = useSelector(mapState);
  const [isAdmin, setIsAdmin] = useState();
  const { wishlistItems } = useSelector(mapWishlistState);
  const [hideWishlistContainer, setHideWishlistContainer] = useState(true);

  useEffect(() => {
    setIsAdmin(checkUserIsAdmin(currentUser))
  }, [currentUser])

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  useEffect(() => {
    setActiveMenu(false);
  }, [location]);

  const handleWishlistCall = () => {
    if (hideWishlistContainer) {
      setHideWishlistContainer(false);
    } else {
      setHideWishlistContainer(true);
    }
  }

  return (
    <header className={!currentUser ? "hideAdmin header" : !isAdmin ? "hideAdmin header" : "header"}>
      <div className="wrap">
        <div className="logoH"></div>
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="eStore LOGO" />
          </Link>
        </div>

        <nav className='nav-menu'>
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
                <div id="wishlistCall" onClick={() => handleWishlistCall()}>
                  <span className={totalNumWishlistItems > 0 ? "wishBucket" : "emptyBucket"}>{totalNumWishlistItems}</span>
                  <FontAwesomeIcon icon={faHeart} style={{ color: "#34495e", fontSize: "1.1em" }} />
                </div>
              </li>
              <li>
                <Link to="/cart">
                  <FaIcons.FaShoppingCart className="icons cartIcon" style={{ color: "#34495e" }} />
                  <span className={totalNumCartItems > 0 ? "cartBucket" : "emptyBucket"}>{totalNumCartItems}</span>
                </Link>
              </li>

              {currentUser && [
                <li key={1} >
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
      <div className={hideWishlistContainer ? "wishlistContainer" : "wishlistContainer toggleWishlistHide"}>
        <p className="wishlistHeading">Wishlist</p>
        <div className="wishlist-content">
          <Wishlist wishlistItems={wishlistItems} />
        </div>
      </div>

    </header>
  );
};

Header.defaultProps = {
  currentUser: null
};

export default Header;
