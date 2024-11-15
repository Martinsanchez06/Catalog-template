import React, { useState } from "react";
import Header from "../../components/HeaderApp";
import Footer from "../../components/Footer";
import Button from "../../components/RedirectButtonComponent";
import DropdownComponent from "../../components/DropdownComponent";
import CardMainComponent from "../../components/CardHomeMainComponent";
import { useScroll } from '../../hooks/ScrollContext';

interface DiscountBadgeProps {
  discount: number;
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ discount }) => {
  return (
    <div className="absolute top-2 left-2 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold">
      {discount}%
    </div>
  );
};

interface DiscountCardComponentProps {
  title: string;
  price: string;
  description: string;
  discount: number;
}

const DiscountCardComponent: React.FC<DiscountCardComponentProps> = ({
  title,
  price,
  description,
  discount,
}) => {
  return (
    <div className="relative w-[352px] p-4 bg-white rounded-lg shadow-cardHomeShadow flex flex-col items-center">
      <DiscountBadge discount={discount} />
      <div className="w-full h-96 bg-gray-300 rounded-md mb-4"></div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-500 mb-2">{price}</p>
      <p className="text-gray-400 mb-4">{description}</p>
      <button className="px-2.5 py-1.5 bg-gray-400 text-white rounded-md">
        Ver detalle
      </button>
    </div>
  );
};

const Home: React.FC = () => {
  const { scrolled } = useScroll();

  const options = [
    { label: "Opción 1", value: "opcion1" },
    { label: "Opción 2", value: "opcion2" },
    { label: "Opción 3", value: "opcion3" },
  ];

  // Estado para controlar la cantidad de elementos mostrados
  const [visibleCards, setVisibleCards] = useState(12);

  // Función para mostrar más cards
  const showMoreCards = () => {
    setVisibleCards((prev) => Math.min(prev + 8, 30)); // Límite de 30 cards
  };

  return (
    <div className="App">
      <Header
        scroll={120}
        blur={175}
      />
      <main className={`max-w-screen-xl flex gap-[50px] m-auto flex-col ${scrolled ? "mt-[345px]" : "mt-[50px]"}`}>
        <section className="w-full border-2 border-secondaryColor flex justify-between items-center py-5 px-[15px] rounded-lg">
          <div className="flex border-tertiaryColor border-2 py-[5px] px-[9px] rounded-lg w-96 h-8">
            <img src="/icons/home/searchIcon.svg" alt="search icon" />
            <input type="text" className="w-full pl-[5px]" placeholder="Buscar productos..." />
          </div>
          <DropdownComponent
            label="Filtrar por categoría"
            options={options}
            onSelect={(value) => console.log("Seleccionado:", value)}
          />
        </section>

        <section className="flex gap-[30px] flex-col">
          <div className="flex justify-between">
            <h2 className="font-semibold text-xl">Lorem ipsum dolor</h2>
            <Button className="px-2.5 py-1.5 bg-gray-400 text-white rounded-md  w-64" text={"Crear nuevo producto"} link="/new" blank={false} />
          </div>
          <div className="flex gap-x-5 gap-y-[50px] flex-wrap">
            {Array.from({ length: 30 })
              .slice(0, visibleCards)
              .map((_, index) => (
                <CardMainComponent
                  key={index}
                  title={`Lorem ${index + 1}`}
                  price={`$00.000`}
                  description="Lorem ipsum"
                />
              ))}
          </div>
          {visibleCards < 30 && (
            <button
              onClick={showMoreCards}
              className="px-2.5 py-1.5 bg-gray-400 text-white rounded-md"
            >
              Ver más
            </button>
          )}
        </section>
        <section className="h-96 w-full bg-tertiaryColor flex justify-between py-[30px] px-[80px] items-center rounded-[20px]">
          <div className="rounded-2xl h-52 w-80 bg-white"></div>
          <p className="w-[645px] text-white text-xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi odio
            corrupti recusandae et error eveniet laborum aliquam id praesentium
            consectetur sit placeat, tempore illo. Vitae sapiente quam nobis
            neque modi?Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Quasi odio corrupti recusandae et error eveniet laborum aliquam id
            praesentium consectetur sit placeat, tempore illo. Vitae sapiente
            quam nobis neque modi?
          </p>
        </section>
        <section className="flex gap-5 justify-between">
          <DiscountCardComponent
            title="Lorem 1"
            price="$00.000"
            description="Lorem ipsum"
            discount={30}
          />
          <DiscountCardComponent
            title="Lorem 2"
            price="$00.000"
            description="Lorem ipsum"
            discount={20}
          />
          <DiscountCardComponent
            title="Lorem 3"
            price="$00.000"
            description="Lorem ipsum"
            discount={10}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
