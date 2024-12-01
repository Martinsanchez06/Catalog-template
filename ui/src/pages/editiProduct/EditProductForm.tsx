import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FetchComponent from "../../components/fetch/FetchComponent";
import ProductForm from "../../components/Forms/ProductForm";

interface Product {
    // id: number;
    name: string;
    description: string;
    price: number;
    image_url?: (string | undefined)[]; // URLs de las imágenes
    category_id: number;
    created_at: string;
}

const EditProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [image_url, setimage_url] = useState<string[]>([]);

    const handleUpdate = async (data: Product) => {
        try {
            // Realiza la solicitud PUT al backend para actualizar el producto
            const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el producto");
            }

            console.log("Producto actualizado con éxito");
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    };

    return (
        <FetchComponent<Product>
            endpoint={`http://127.0.0.1:8000/api/products/${id}`}
            queryKey={`product-${id}`}
            render={(data) =>
                data ? (
                    <div className="max-w-7xl mx-auto p-8">
                        <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
                        <ProductForm
                            initialValues={{
                                // id: data.id,
                                name: data.name,
                                description: data.description,
                                price: data.price,
                                category_id: data.category_id,
                                created_at: data.created_at,
                            }}
                            onSubmit={handleUpdate}
                            categories={[
                                { label: "Electrónica", value: 1 },
                                { label: "Ropa", value: 2 },
                                { label: "Hogar", value: 3 },
                            ]}
                            image_url={image_url}
                            setimage_url={setimage_url}
                        />
                    </div>
                ) : (
                    <p>Cargando...</p>
                )
            }
        />
    );
};

export default EditProductPage;
