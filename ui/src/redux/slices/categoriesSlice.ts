import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Category {
    id: number;
    name: string;
    description: string;
}

interface CategoriesState {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
};

// Acción asíncrona para obtener las categorías
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<Category[]>("http://127.0.0.1:8000/api/categories");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default categoriesSlice.reducer;
