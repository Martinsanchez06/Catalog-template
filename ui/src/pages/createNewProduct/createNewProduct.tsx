import React, { useState } from "react";
import axios from "axios";
import ProductForm from "../../components/Forms/ProductForm";
import Header from "../../components/HeaderApp";
import { useNavigate } from "react-router-dom";

interface ProductFormInputs {
    discountPrice?: number; // Opcional
    name: string;
    price: number;
    description: string;
    category_id: number;
    created_at: string;
    image_url?: (string | undefined)[]; // URLs de las imágenes
}

const CreateProductPage: React.FC = () => {
    const navigate = useNavigate()
    const [image_url, setimage_url] = useState<string[]>([]); // Inicializado como un array vacío
    const handleCreate = async (data: ProductFormInputs) => {
        try {
            const productPayload = {
                product: {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    image_url: data.image_url, // Asegúrate de que sea un array de arrays
                    category_id: data.category_id,
                },
                images: data.image_url, // Enviar las mismas imágenes en este campo
            };

            const response = await axios.post("http://127.0.0.1:8000/api/products", productPayload);

            navigate('/')
        } catch (error) {
            console.error("Error al crear el producto:", error);
        }
    };    


    return (
        <>
            <Header scroll={25} blur={87} />
            <main className={`max-w-screen-xl flex gap-[50px] m-auto flex-col transition-all duration-300 mt-[172px]`}>
                <div className="w-full p-8 bg-white rounded-lg shadow-md my-[50px]">
                    <h2 className="text-2xl font-bold text-center mb-6">Crear un producto</h2>
                    <ProductForm
                        initialValues={{}} // Valores vacíos para creación
                        onSubmit={handleCreate}
                        categories={[
                            { label: "Electrónica", value: 1 },
                            { label: "Ropa", value: 2 },
                            { label: "Hogar", value: 3 },
                        ]}
                        image_url={image_url}
                        setimage_url={setimage_url}
                    />
                </div>
            </main>
        </>
    );
};

export default CreateProductPage;
