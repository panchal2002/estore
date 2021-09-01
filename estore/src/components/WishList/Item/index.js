import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeWishlistItem } from '../../../redux/Wishlist/wishlist.actions';

const Item = (product) => {
    const dispatch = useDispatch();
    const {
        productName,
        productThumbnail,
        productPrice,
        documentID
    } = product;

    const handleRemoveWishlistItem = (documentID) => {
        dispatch(
            removeWishlistItem({
                documentID
            })
        );
    }

    return (
        <table className="wishlistItem" border="0" cellSpacing="0" cellPadding="10">
            <tbody>
                <tr>

                    <td className="imageCol">
                        <Link to={`/product/${documentID}`}>
                            <img src={productThumbnail} alt={productName} />
                        </Link>
                    </td>
                    <td className="nameCol">
                        <Link to={`/product/${documentID}`}>
                            {productName}
                            <br />
                            ₹{productPrice}
                        </Link>
                    </td>


                    {/* <td>
                        ₹{productPrice}
                    </td> */}
                    <td align="center" className="removeCol">
                        <span className="cartBtn remove" onClick={() => handleRemoveWishlistItem(documentID)}>
                            X
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Item;
