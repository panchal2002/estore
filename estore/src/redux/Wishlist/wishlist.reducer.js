import wishlistTypes from './wishlist.types';
import {
    handleAddToWishlist, handleRemoveWishlistItem
} from './wishlist.utils';

const INITIAL_STATE = {
    wishlistItems: []
};

const wishlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case wishlistTypes.ADD_TO_WISHLIST:
            return {
                ...state,
                wishlistItems: handleAddToWishlist({
                    prevWishlistItems: state.wishlistItems,
                    nextWishlistItem: action.payload
                })
            };
        case wishlistTypes.REMOVE_WISHLIST_ITEM:
            return {
                ...state,
                wishlistItems: handleRemoveWishlistItem({
                    prevWishlistItems: state.wishlistItems,
                    wishlistItemToRemove: action.payload
                })
            };
        case wishlistTypes.CLEAR_WISHLIST:
            return {
                ...state,
                ...INITIAL_STATE
            }
        default:
            return state;
    }
};

export default wishlistReducer;