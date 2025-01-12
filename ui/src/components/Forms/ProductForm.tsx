import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FileUpload from "./FileUpload";
import axios from "axios";

const schema = yup.object({
    name: yup.string().required("El nombre es obligatorio"),
    description: yup.string().required("La descripción es obligatoria"),
    price: yup.number().positive("El precio debe ser positivo").required("El precio es obligatorio"),
    category_id: yup.number().required("La categoría es obligatoria"),
    created_at: yup.string().required("La fecha es obligatoria"),
    image_url: yup.array().of(yup.string()).optional(),
});

interface ProductFormInputs {
    name: string;
    description: string;
    price: number;
    category_id: number;
    created_at: string;
    image_url?: (string | undefined)[]; // URLs de las imágenes
}

interface ProductFormProps {
    initialValues: Partial<ProductFormInputs>;
    onSubmit: (data: ProductFormInputs) => void;
    categories: { label: string; value: number }[];
    image_url: string[]; // Siempre un array de strings
    setimage_url: React.Dispatch<React.SetStateAction<string[]>>; // Maneja solo arrays de strings
}

const ProductForm: React.FC<ProductFormProps> = ({
    initialValues,
    onSubmit,
    categories,
    image_url,
    setimage_url,
    // existingImages = [], // URLs de imágenes actuales en caso de edición
}) => {
    const [files, setFiles] = useState<File[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProductFormInputs>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    const handleFilesSelected = (selectedFiles: File[]) => {
        setFiles(selectedFiles);
    };

    const handleFormSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
        try {
            // Subir imágenes nuevas si las hay
            if (files.length > 0) {
                const formData = new FormData();
                files.forEach((file) => formData.append("files", file));

                const uploadResponse = await axios.post(
                    "http://127.0.0.1:8000/api/upload-files/",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                const newimage_url = uploadResponse.data.uploaded_files.map(
                    (file: { url: string }) => file.url
                );
                setimage_url((prev) => [...prev, ...newimage_url]); // Prev siempre es un array
                const productData = { ...data, image_url: newimage_url};
                await onSubmit(productData);
            }

            // Llama a la función de envío con todas las URLs de imágenes (nuevas y existentes)
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert("Ocurrió un error al enviar el formulario.");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-2 gap-6">
            <div className="col-span-2 border border-gray-300 p-4 rounded-md">
                <h3 className="text-gray-500 font-semibold mb-4">Producto</h3>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block font-medium mb-1">Nombre del producto</label>
                        <input
                            type="text"
                            {...register("name")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <p className="text-red-500 text-sm">{errors.name?.message}</p>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Descripción</label>
                        <textarea
                            {...register("description")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <p className="text-red-500 text-sm">{errors.description?.message}</p>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Imágenes</label>
                        <FileUpload onFilesSelected={handleFilesSelected} />
                        {image_url && image_url?.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-gray-500 font-medium mb-2">Imágenes actuales:</h4>
                                <div className="flex gap-4 flex-wrap">
                                    {image_url?.map((url, index) => (
                                        <img
                                            key={index}
                                            src={`http://127.0.0.1:8000/api/images/${url}`}
                                            alt={`Imagen ${index}`}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="border border-gray-300 p-4 rounded-md">
                <h3 className="text-gray-500 font-semibold mb-4">Categoría</h3>
                <select
                    {...register("category_id")}
                    className="w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
                <p className="text-red-500 text-sm">{errors.category_id?.message}</p>
            </div>

            <div className="border border-gray-300 p-4 rounded-md">
                <h3 className="text-gray-500 font-semibold mb-4">Fecha de publicación</h3>
                <input
                    type="date"
                    {...register("created_at")}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <p className="text-red-500 text-sm">{errors.created_at?.message}</p>
            </div>

            <div className="col-span-2 border border-gray-300 p-4 rounded-md">
                <h3 className="text-gray-500 font-semibold mb-4">Precio</h3>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block font-medium mb-1">Precio</label>
                        <input
                            type="number"
                            {...register("price")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <p className="text-red-500 text-sm">{errors.price?.message}</p>
                    </div>
                </div>
            </div>

            <div className="col-span-2 flex justify-end gap-4">
                <button type="submit" className="px-4 py-2 bg-gray-500 text-white rounded-md">
                    Guardar
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
