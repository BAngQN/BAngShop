import { type HomePageProduct } from "../../types/Product";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AddProductsPayload {
    items: HomePageProduct[];
    page: number;
    pages: number;
}

export default createSlice({
    name: "products",
    initialState: {
        items: [] as HomePageProduct[],
        pages: null as number | null,
        page: 1,
    },
    reducers: {
        addProducts(state, action: PayloadAction<AddProductsPayload>) {
            state.items = [...action.payload.items];
            state.page = action.payload.page;
            state.pages = action.payload.pages;
        },
    },
});
