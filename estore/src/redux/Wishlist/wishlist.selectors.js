import { createSelector } from 'reselect';

export const selectWishlistData = state => state.wishlistData;

export const selectWishlistItems = createSelector(
    [selectWishlistData],
    wishlistData => wishlistData.wishlistItems
);

export const selectWishlistItemsCount = createSelector(
    [selectWishlistItems],
    wishlistItems => wishlistItems.length
);