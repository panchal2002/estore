import React from 'react';
import { Link } from 'react-router-dom';
import ShopMen from './../../assets/shopMens.jpg';
import ShopWomen from './../../assets/shopWomens.jpg';
import './styles.scss';

const Directory = props => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(52, 73, 94, 0.7), rgba(52, 73, 94, 0.7)), url(https://c.pxhere.com/photos/d4/7e/attractive_cute_eyewear_face_fashion_man_outdoors_person-1525347.jpg!d)`
          }}
        >
          <Link to="/search/sunglasses">
            Shop Sunglasess
          </Link>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(52, 73, 94, 0.7), rgba(52, 73, 94, 0.7)), url(https://c.pxhere.com/photos/7d/0c/coffee_cup_takeaway_glasses_spectacles-1283797.jpg!d)`
          }}
        >
          <Link to="/search/roundSunglasess">
            Shop Round Sunglasess
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
