// src/components/AddToCartButton.tsx
import React from "react";
import { useAppDispatch } from "../../redux/store";
import { addToCart } from "../../redux/slices/cartSlice";

interface AddToCartButtonProps {
    id: number;
    name: string;
    price: number;
    category_id: string;
    image_url?: string[];
    className: string
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ id, name, price, category_id, image_url, className }) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ id, name, price, category_id, quantity: 1, image_url }));
    };

    return (
        <button
            onClick={handleAddToCart}
            className={className}
        >
            Añadir al carrito
        </button>
    );
};

export default AddToCartButton;
