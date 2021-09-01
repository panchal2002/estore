import wishlistTypes from './wishlist.types';

export const addProductToWishlist = (nextWishlistItem) => ({
    type: wishlistTypes.ADD_TO_WISHLIST,
    payload: nextWishlistItem
});

export const removeWishlistItem = (wishlistItem) => ({
    type: wishlistTypes.REMOVE_WISHLIST_ITEM,
    payload: wishlistItem
});
