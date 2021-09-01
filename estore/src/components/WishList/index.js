import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectWishlistItems } from '../../redux/Wishlist/wishlist.selectors';
import { createStructuredSelector } from 'reselect';
import './styles.scss';
import Item from './Item';

const mapState = createStructuredSelector({
    wishlistItems: selectWishlistItems
});

const Wishlist = ({ }) => {
    const { wishlistItems } = useSelector(mapState);

    const errMsg = 'You have no items in your wishlist.';

    return (
        <div className="wishlist">
            <div className="wishlistItems">
                {wishlistItems.length > 0 ? (

                    <table border="0" cellSpacing="0" cellPadding="0">
                        <tbody>
                            {wishlistItems.map((item, pos) => {
                                return (
                                    <tr key={pos}>
                                        <td>
                                            <Item {...item} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p>
                        {errMsg}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Wishlist;