import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../../types/Product";

interface ProductFilterPayload {
    searchQuery: string;
    category: Category | "all";
    page: number;
}

const initState: ProductFilterPayload = {
    searchQuery: "",
    category: "all",
    page: 1,
};

export default createSlice({
    name: "productFilter",
    initialState: initState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
            state.category = "all";
            state.page = 1;
        },
        setCategory(state, action: PayloadAction<Category>) {
            state.category = action.payload;
            state.searchQuery = "";
            state.page = 1;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
    },
});
