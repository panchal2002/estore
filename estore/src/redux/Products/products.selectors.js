import { createSelector } from 'reselect';

export const selectProductsData = state => state.productsData;

export const selectProductstItems = createSelector(
    [selectProductsData],
    productsData => productsData.products
);