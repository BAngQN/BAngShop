import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItemData } from "../../types/Cart";

interface AuthUser {
    id: string;
    username: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: AuthUser | null;
    cart: CartItemData[];
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    cart: [],
};

export default createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(
            state,
            action: PayloadAction<{ user: AuthUser; cart: CartItemData[] }>,
        ) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.cart = action.payload.cart;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.cart = [];
        },
        setCart(state, action: PayloadAction<CartItemData[]>) {
            state.cart = action.payload;
        },
    },
});
