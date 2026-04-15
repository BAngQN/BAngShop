import type { RootState } from "./store";

export const productsPageSelector = (state: RootState) => state.filters.page;
export const productsTotalPageSelector = (state: RootState) =>
    state.products.pages;
export const productsCategorySelector = (state: RootState) =>
    state.filters.category;
export const productsSearchQuerySelector = (state: RootState) =>
    state.filters.searchQuery;

export const productsSelector = (state: RootState) => state.products.items;
