import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category_id: string;
    image_url?: string[];
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                // Si el producto ya está en el carrito, aumenta la cantidad
                existingItem.quantity += action.payload.quantity;
            } else {
                // Si no está en el carrito, lo agrega
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

// Exporta las acciones
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Exporta el reducer
export default cartSlice.reducer;
