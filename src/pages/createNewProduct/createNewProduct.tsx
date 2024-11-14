import React from "react";
import Header from "../../components/HeaderApp";
import DropdownComponent from "../../components/DropdownComponent";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useScroll } from '../../hooks/ScrollContext';

interface ProductFormInputs {
    name: string;
    price: number;
    description: string;
    category: string;
    date: string;
}

const schema = yup.object().shape({
    name: yup.string().required("El nombre es obligatorio"),
    price: yup.number().positive("El precio debe ser un número positivo").required("El precio es obligatorio"),
    description: yup.string().required("La descripción es obligatoria"),
    category: yup.string().required("La categoría es obligatoria"),
    date: yup.string().required("La fecha es obligatoria"),
});

const CreateNewProduct: React.FC = () => {
    const { scrolled } = useScroll();

    const { register, handleSubmit, formState: { errors } } = useForm<ProductFormInputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<ProductFormInputs> = (data) => {
        console.log("Datos del producto:", data);
        // Aquí puedes hacer una llamada a la API para enviar los datos
    };

    const categories = [
        { label: "Electrónica", value: "electronics" },
        { label: "Ropa", value: "clothing" },
        { label: "Hogar", value: "home" }
    ];


    return (
        <>
            <Header
                scroll={25}
                blur={87}
            />
            <main className={`max-w-screen-xl flex gap-[50px] m-auto flex-col transition-all duration-300 mt-[172px]`}>
                <div className=" w-full p-8 bg-white rounded-lg shadow-md my-[50px]">
                    <h2 className="text-2xl font-bold text-center mb-6">Crear un producto</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">

                        {/* Sección de Producto */}
                        <div className="col-span-2 border border-gray-300 p-4 rounded-md">
                            <h3 className="text-gray-500 font-semibold mb-4">PRODUCTO</h3>
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
                                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                                        <img src="/icons/upload-icon.svg" alt="Upload Icon" className="mb-2" />
                                        <p className="text-gray-600">Drag and drop files on here</p>
                                        <p className="text-gray-400 text-sm">Lorem ipsum dolor Lorem</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categoría */}
                        <div className="border border-gray-300 p-4 rounded-md">
                            <h3 className="text-gray-500 font-semibold mb-4">CATEGORÍA</h3>
                            <DropdownComponent
                                label="Selecciona una categoría"
                                options={categories}
                                onSelect={(value) => console.log("Categoría seleccionada:", value)}
                            />
                            <p className="text-red-500 text-sm">{errors.category?.message}</p>
                        </div>

                        {/* Fecha de Publicación */}
                        <div className="border border-gray-300 p-4 rounded-md">
                            <h3 className="text-gray-500 font-semibold mb-4">FECHA DE PUBLICACION</h3>
                            <input
                                type="date"
                                {...register("date")}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <p className="text-red-500 text-sm">{errors.date?.message}</p>
                        </div>

                        {/* Precio */}
                        <div className="col-span-2 border border-gray-300 p-4 rounded-md">
                            <h3 className="text-gray-500 font-semibold mb-4">PRECIO</h3>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block font-medium mb-1">Precio Regular</label>
                                    <div className="flex items-center">
                                        <input
                                            type="number"
                                            {...register("price")}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                        <span className="ml-2">COP</span>
                                    </div>
                                    <p className="text-red-500 text-sm">{errors.price?.message}</p>
                                </div>
                                <div className="flex-1">
                                    <label className="block font-medium mb-1">Precio Descuento</label>
                                    <div className="flex items-center">
                                        <input
                                            type="number"
                                            {...register("price")}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                        <span className="ml-2">COP</span>
                                    </div>
                                    <p className="text-red-500 text-sm">{errors.price?.message}</p>
                                </div>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="col-span-2 flex justify-end gap-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                            >
                                Guardar producto
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-300 text-black rounded-md"
                            >
                                Guardar borrador
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default CreateNewProduct;
