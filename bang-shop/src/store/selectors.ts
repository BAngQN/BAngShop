import type { RootState } from "./store";

export const productsPageSelector = (state: RootState) => state.filters.page;
export const productsTotalPageSelector = (state: RootState) =>
    state.products.pages;
export const productsCategorySelector = (state: RootState) =>
    state.filters.category;
export const productsSearchQuerySelector = (state: RootState) =>
    state.filters.searchQuery;

export const productsSelector = (state: RootState) => state.products.items;

export const authenticatorSelector = (state: RootState) =>
    state.authenticator.isAuthenticated;

export const userSelector = (state: RootState) => state.authenticator.user;

export const cartSelector = (state: RootState) => state.authenticator.cart;

export const cartCountSelector = (state: RootState) =>
    state.authenticator.cart.reduce((sum, item) => sum + item.quantity, 0);
