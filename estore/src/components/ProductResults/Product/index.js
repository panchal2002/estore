import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from './../../forms/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from './../../../redux/Cart/cart.actions';
import { addProductToWishlist, removeWishlistItem } from '../../../redux/Wishlist/wishlist.actions';
import { selectWishlistItems } from '../../../redux/Wishlist/wishlist.selectors';
import { createStructuredSelector } from 'reselect';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const mapWishlistState = createStructuredSelector({
    wishlistItems: selectWishlistItems
});

const Product = (product) => {
    const { wishlistItems } = useSelector(mapWishlistState);
    const [addedInWishlist, setAddedInWishlist] = useState(false);

    useEffect(() => {
        if (wishlistItems.find(wishlistItem => wishlistItem.documentID === product.documentID)) {
            setAddedInWishlist(true);
        }
    }, [])
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        documentID,
        productThumbnail,
        productName,
        productPrice
    } = product;

    if (!documentID || !productThumbnail || !productName ||
        typeof productPrice === 'undefined') return null;

    const configAddToCartBtn = {
        type: 'button'
    };

    const handleAddToCart = (product) => {
        if (!product) return;
        dispatch(
            addProduct(product)
        );
        history.push('/cart');
    };


    const handleAddToWishlist = (product) => {
        if (!product) return;


        if (wishlistItems.find(wishlistItem => wishlistItem.documentID === product.documentID)) {
            dispatch(removeWishlistItem(product));
            setAddedInWishlist(false);
        }
        else {
            dispatch(addProductToWishlist(product));
            setAddedInWishlist(true);
        }
    }

    return (
        <div className="product">
            <div className="thumb">
                <Link to={`/product/${documentID}`}>
                    <img src={productThumbnail} alt={productName} />
                </Link>
            </div>

            <div className="details">
                <ul>
                    <li>
                        <span className="name">
                            <Link to={`/product/${documentID}`}>
                                {productName}
                            </Link>
                        </span>
                        <span className="wishlistIcon" onClick={() => handleAddToWishlist(product)}>
                            {addedInWishlist ?
                                <FontAwesomeIcon icon={faHeartSolid} style={{ color: "#34495e", fontSize: "1.1em", }} />
                                : <FontAwesomeIcon icon={faHeart} style={{ color: "#34495e", fontSize: "1.1em", }} />}
                        </span><br />
                        <span className="price">
                            ₹{productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                                Add to cart
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default Product;