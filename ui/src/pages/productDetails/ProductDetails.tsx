import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FetchComponent from "../../components/fetch/FetchComponent";
import Header from "../../components/HeaderApp";
import Footer from "../../components/Footer";
import AddToCartButton from "../../components/General/AddToCardComponent";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category_id: string;
    images?: string[];
}

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <Header scroll={25} blur={32} />
            <main className={`max-w-screen-xl flex gap-[50px] m-auto flex-col transition-all duration-300 mt-[172px]`}>
                <FetchComponent<Product>
                    endpoint={`http://127.0.0.1:8000/api/products/${id}`}
                    queryKey={`product-${id}`}
                    render={(data) =>
                        data ? (
                            <div className="mx-auto w-full p-8 flex flex-col gap-10">
                                <section className="flex gap-10">
                                    {/* Imagen principal */}
                                    <div className="w-1/2">
                                        <div className="rounded-md overflow-hidden mb-4">
                                            {data.images ? (
                                                <div className="w-full h-[400px] rounded-md mb-4">
                                                    <img
                                                        src={`http://127.0.0.1:8000/api/images/${selectedImage || data.images[0]}`}
                                                        alt={data.name}
                                                        className="w-full h-full object-cover rounded-md"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-[400px] bg-gray-300 rounded-md" />
                                            )}
                                        </div>
                                        {/* Lista de imágenes */}
                                        {data.images && data.images.length > 1 && (
                                            <div className="flex gap-4">
                                                {data.images.map((image, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setSelectedImage(image)}
                                                        className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                                                            selectedImage === image
                                                                ? "border-blue-600"
                                                                : "border-gray-300"
                                                        }`}
                                                    >
                                                        <img
                                                            src={`http://127.0.0.1:8000/api/images/${image}`}
                                                            alt={`Thumbnail ${index}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Detalles del producto */}
                                    <div className="w-1/2 flex flex-col gap-4">
                                        <h2 className="text-2xl font-bold">{data.name}</h2>
                                        <p className="text-3xl font-bold">{`$${data.price}`}</p>
                                        <p className="text-gray-500">{data.description}</p>
                                        <AddToCartButton
                                            id={data.id}
                                            name={data.name}
                                            price={data.price}
                                            category_id={data.category_id}
                                            image_url={data.images}
                                            className={"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"}
                                        />
                                    </div>
                                </section>
                            </div>
                        ) : (
                            <p>Cargando...</p>
                        )
                    }
                />
            </main>
            <Footer />
        </>
    );
};

export default ProductDetailPage;
