// exampleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
    keyChangeCount: number; // Representa la cantidad de cambios o reinicios
}

const initialState: ExampleState = {
    keyChangeCount: 0, // Inicialmente, la clave comienza en 0
};

const exampleSlice = createSlice({
    name: 'example',
    initialState,
    reducers: {
        keyChange(state) {
            state.keyChangeCount += 1; // Incrementa el contador de cambios
        },
    },
});

// Exporta acciones y reducer
export const { keyChange } = exampleSlice.actions;
export default exampleSlice.reducer;
