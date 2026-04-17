import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import productSlices from "../components/ProductList/productSlices";
import productFilterSlices from "../components/ProductList/productFilterSlices";
import authSlice from "../components/AuthForm/authSlice";

const store = configureStore({
    reducer: {
        products: productSlices.reducer,
        filters: productFilterSlices.reducer,
        authenticator: authSlice.reducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
