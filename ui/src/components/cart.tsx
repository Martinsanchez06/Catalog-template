// src/components/CartSummary.tsx
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { RootState } from "../redux/store";
import { removeFromCart, clearCart } from "../redux/slices/cartSlice";
import useGet from "../hooks/GetRequest";

interface CartSummaryProps {
    blur: boolean; // Nueva prop para manejar el estado de blur
}

interface Category {
    id: number;
    name: string;
    description: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({ blur }) => {
    const { data: categories, isLoading: categoriesLoading, error: categoriesError } =
        useGet<Category[]>("http://127.0.0.1:8000/api/categories");
    const [isOpen, setIsOpen] = useState(false);
    const cartItems = useAppSelector((state: RootState) => state.cart.items);
    const dispatch = useAppDispatch();

    const toggleCart = () => setIsOpen(!isOpen);

    const handleRemoveItem = (id: number) => {
        dispatch(removeFromCart(id));
    };

    // Función para generar la cotización en texto
    const generateQuotationText = (): string => {
        if (cartItems.length === 0) {
            return "Tu carrito está vacío, agrega productos para cotizar.";
        }

        let message = "🛒 *Cotización de tu Pedido* 🛒\n\n";
        let total = 0;

        cartItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            const category = categories?.find(cat => cat.id === Number(item.category_id))?.name
            total += itemTotal;

            message += `${index + 1}. *${item.name}*\n`;
            message += `   - Categoría: ${category}\n`;
            message += `   - Precio unitario: $${item.price.toFixed(2)}\n`;
            message += `   - Cantidad: ${item.quantity}\n`;
            message += `   - Subtotal: $${itemTotal.toFixed(2)}\n\n`;
        });

        message += `🧾 *Total del pedido: $${total.toFixed(2)}*\n\n`;
        message += "¡Gracias por tu preferencia! 😊";

        return message;
    };

    if (cartItems.length === 0) {
        return <p>Tu carrito está vacío.</p>;
    }

    const quotationText = generateQuotationText();

    return (
        <div className="relative">
            {/* Icono del carrito */}
            <div className="cursor-pointer flex items-center" onClick={toggleCart}>
                <img
                    src={`/icons/header/${blur ? "shoppingCartIconBlack.svg" : "shoppingCartIconWhite.svg"}`}
                    className="transition-all duration-300"
                    alt="Carrito de compras"
                />
                {cartItems.length > 0 && (
                    <span className="absolute top-[-5px] left-[20px] bg-red-500 text-white rounded-full text-xs px-1 py-0">
                        {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                )}
            </div>

            {/* Menú desplegable del carrito */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">Carrito</h3>
                        {cartItems.length > 0 ? (
                            <ul className="max-h-64 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="flex justify-between items-center mb-2">
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">{`$${item.price} x ${item.quantity}`}</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-500 hover:underline text-sm"
                                        >
                                            Eliminar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">El carrito está vacío.</p>
                        )}
                    </div>

                    {/* Botones de acciones */}
                    {cartItems.length > 0 && (
                        <div className="border-t border-gray-200 p-4 flex justify-between flex-col">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                                onClick={() => {
                                    const whatsappMessage = encodeURIComponent(quotationText);
                                    window.open(
                                        `https://api.whatsapp.com/send/?phone=573001804907&text=${whatsappMessage}`,
                                        "_blank"
                                    );
                                    
                                }}>
                                Ver pedido por whatsapp
                            </button>
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="text-red-500 hover:underline text-sm"
                            >
                                Vaciar carrito
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CartSummary;