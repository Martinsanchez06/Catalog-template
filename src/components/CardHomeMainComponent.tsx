interface CardMainComponentProps {
  title: string;
  price: string;
  description: string;
  imageUrl?: string;
}

const CardMainComponent: React.FC<CardMainComponentProps> = ({ title, price, description, imageUrl }) => {
  return (
    <div className="w-[305px] p-4 bg-white rounded-lg shadow-cardHomeShadow flex flex-col items-center">
      <div className="w-full h-96 bg-gray-300 rounded-md mb-4">
        {imageUrl && <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-md" />}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-500 mb-2">{price}</p>
      <p className="text-gray-400 mb-4">{description}</p>
      <button className="px-2.5 py-1.5 bg-gray-400 text-white rounded-md">
        Ver detalle
      </button>
    </div>
  );
};

export default CardMainComponent;
