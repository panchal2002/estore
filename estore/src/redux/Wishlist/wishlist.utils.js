export const existingWishlistItem = ({
    prevWishlistItems,
    nextWishlistItem
}) => {
    return prevWishlistItems.find(
        wishlistItem => wishlistItem.documentID === nextWishlistItem.documentID
    );
};

export const handleAddToWishlist = ({
    prevWishlistItems,
    nextWishlistItem
}) => {
    const wishlistItemExists = existingWishlistItem({ prevWishlistItems, nextWishlistItem });

    if (wishlistItemExists) {
        return prevWishlistItems
    }

    return [
        ...prevWishlistItems,
        { ...nextWishlistItem }
    ];
};

export const handleRemoveWishlistItem = ({
    prevWishlistItems,
    wishlistItemToRemove
}) => {
    return prevWishlistItems.filter(item => item.documentID !== wishlistItemToRemove.documentID);
}
