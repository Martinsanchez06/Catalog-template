import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { keyChange } from "../../redux/slices/keyChangeSlice";

interface CardMainComponentProps {
  id: number; // Necesitamos la ID para redirigir
  title: string;
  price: string;
  description: string;
  image_url?: string;
}


interface PopUpEditComponentProps {
  productId: string | number
  onClose: () => void; // Función para cerrar el popup
}

const PopUpEditComponent: React.FC<PopUpEditComponentProps> = ({ productId, onClose }) => {
  const dispatch = useAppDispatch();
  const changeCount = useAppSelector((state) => state.example.keyChangeCount);
  const popUpRef = useRef<HTMLDivElement>(null);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${productId}`);
      onClose()
      dispatch(keyChange())

    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Hubo un error al intentar eliminar el producto.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log((popUpRef.current && !popUpRef.current.contains(event.target as Node)));
      if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
        onClose()
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-full w-full fixed bg-[#00000080] top-0 left-0 z-[200] flex justify-center items-center">
      <div className="h-[514px] w-[597px] bg-white rounded-[32px] flex justify-center items-center flex-col gap-[40px]" ref={popUpRef}>
        {/* {`Pop-up ${productId}`} */}
        <div className="h-[100px] w-[100px] bg-[#D9D9D9] rounded-[100%] flex justify-center items-center">
          <img src="/icons/home/changeIcon.svg" alt="" />
        </div>
        <p>QUE ACCIÓN DESEAS HACER?</p>
        <Link to={`/products/edit/${productId}`} className="px-2.5 py-1.5 bg-gray-400 mt-5 text-white rounded-md w-[500px] text-center">EDITAR PRODUCTO</Link>
        <button onClick={handleDelete} className="px-2.5 py-1.5 bg-gray-400 mt-5 text-white rounded-md w-[500px]">ELIMINAR PRODUCTO</button>
      </div>
    </div>
  );
};

const CardMainComponent: React.FC<CardMainComponentProps> = ({
  id,
  title,
  price,
  description,
  image_url,
}) => {
  const [showEditProduct, setShowEditProduct] = useState(false)
  return (
    <>

      <div className="w-full h-96 rounded-md mb-4">
        {image_url && <img src={`http://127.0.0.1:8000/api/images/${image_url}`} alt={title} className="w-full h-full object-cover rounded-md" />}
        {/* {<img src={"http://127.0.0.1:8000/api/images/emoji-heart-fire.webp"} alt={title} className="w-full h-full object-cover rounded-md" />} */}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-500 mb-2">{price}</p>
      <p className="text-gray-400 mb-4">
        {description.length > 40 ? `${description.slice(0, 28)}...` : description}
      </p>
      <Link
        to={`/product/${id}`}
        className="px-2.5 py-1.5 bg-gray-400 text-white rounded-md w-full text-center"
      >
        Ver detalle
      </Link>
      <button className="px-2.5 py-1.5 bg-gray-400 mt-5 text-white rounded-md w-full" onClick={() => setShowEditProduct(!showEditProduct)}>Editar</button>
      {showEditProduct && (
        <PopUpEditComponent productId={id} onClose={() => setShowEditProduct(!showEditProduct)} />
      )}
    </>
  );
};

export default CardMainComponent;
