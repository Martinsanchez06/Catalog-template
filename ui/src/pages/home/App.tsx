import React, { useState, useMemo } from "react";
import Header from "../../components/HeaderApp";
import Footer from "../../components/Footer";
import Button from "../../components/General/RedirectButtonComponent";
import DropdownComponent from "../../components/General/DropdownComponent";
import CardMainComponent from "../../components/Home/CardHomeMainComponent";
import { useScroll } from "../../hooks/ScrollContext";
import useGet from "../../hooks/GetRequest";
import AddToCartButton from "../../components/General/AddToCardComponent";
import keyChangeSlice, { keyChange } from "../../redux/slices/keyChangeSlice";
import { useAppSelector } from "../../redux/store";

interface Product {
  id: number;
  name: string;
  description: string;
  category_id: string;
  price: number;
  images: string[];
}

interface Category {
  id: number;
  name: string;
  description: string;
}

const Home: React.FC = () => {
  const { scrolled } = useScroll();
  const keyChangeCount = useAppSelector((state) => state.example.keyChangeCount);

  // Pasar `keyChangeCount` como reloadTrigger al hook
  const { data: products, isLoading: productsLoading, error: productsError } = useGet<Product[]>(
    "http://127.0.0.1:8000/api/products",
    keyChangeCount
  );

  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGet<Category[]>(
    "http://127.0.0.1:8000/api/categories"
  )
  
  const [filter, setFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCategories, setVisibleCategories] = useState<number>(2);
  

  // Crear un mapeo de categorías: category_id -> category_name
  const categoryMap = useMemo(
    () =>
      categories?.reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
      }, {} as Record<number, string>),
    [categories]
  );

  // Filtrar productos por término de búsqueda
  const filteredProducts = useMemo(
    () =>
      (products || []).filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  // Agrupar productos por categoría
  const groupedProducts = useMemo(
    () =>
      filteredProducts.reduce((acc, product) => {
        if (!acc[product.category_id]) {
          acc[product.category_id] = [];
        }
        acc[product.category_id].push(product);
        return acc;
      }, {} as Record<string, Product[]>),
    [filteredProducts]
  );

  // Opciones para el dropdown
  const options = useMemo(() => {
    const baseOptions = Object.keys(groupedProducts || {}).map((categoryId) => ({
      label: categoryMap?.[parseInt(categoryId)] || `Categoría ${categoryId}`,
      value: categoryId,
    }));
    // Añadir opción para cancelar el filtro
    return [{ label: "Mostrar todas las categorías", value: "" }, ...baseOptions];
  }, [groupedProducts, categoryMap]);
  

  // Manejar lógica de "Ver más"
  const handleShowMore = () => {
    setVisibleCategories((prev) => prev + 1); // Incrementa una categoría más cada vez que se llama
  };

  const visibleCategoryIds = useMemo(() => {
    const allCategoryIds = Object.keys(groupedProducts || {});
    if (filter) {
      return allCategoryIds.includes(filter) ? [filter] : [];
    }
    return allCategoryIds.slice(0, visibleCategories);
  }, [groupedProducts, visibleCategories, filter]);
  
  

  if (productsLoading || categoriesLoading) return (
    <div className="App">
      <Header scroll={120} blur={175} />
      <main
        className={`max-w-screen-xl flex gap-[50px] m-auto flex-col ${scrolled ? "mt-[345px]" : "mt-[50px]"
          } min-h-screen`}
      >
        {/* Barra de búsqueda y filtro */}
        <section className="w-full border-2 border-secondaryColor flex justify-between items-center py-5 px-[15px] rounded-lg">
          <div className="flex border-tertiaryColor border-2 py-[5px] px-[9px] rounded-lg w-96 h-8">
            <img src="/icons/home/searchIcon.svg" alt="search icon" />
            <input
              type="text"
              className="w-full pl-[5px]"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownComponent
            label="Filtrar por categoría"
            options={options}
            onSelect={(value) => setFilter(value.toString() || null)} // Si el valor es vacío, resetea el filtro
            />
        </section>
        <Button
          className="px-2.5 py-1.5 bg-gray-400 text-white rounded-md w-64"
          text={"Crear nuevo producto"}
          link="/new"
          blank={false}
        />
        <p>Cargando productos...</p>
      </main>
      <Footer />
    </div>
  );
  if (productsError || categoriesError) return (
    <div className="App">
      <Header scroll={120} blur={175} />
      <main
        className={`max-w-screen-xl flex gap-[50px] m-auto flex-col ${scrolled ? "mt-[345px]" : "mt-[50px]"
          } min-h-screen`}
      >
        {/* Barra de búsqueda y filtro */}
        <section className="w-full border-2 border-secondaryColor flex justify-between items-center py-5 px-[15px] rounded-lg">
          <div className="flex border-tertiaryColor border-2 py-[5px] px-[9px] rounded-lg w-96 h-8">
            <img src="/icons/home/searchIcon.svg" alt="search icon" />
            <input
              type="text"
              className="w-full pl-[5px]"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownComponent
            label="Filtrar por categoría"
            options={options}
            onSelect={(value) => setFilter(value.toString())}
          />
        </section>
        <Button
          className="px-2.5 py-1.5 bg-gray-400 text-white rounded-md w-64"
          text={"Crear nuevo producto"}
          link="/new"
          blank={false}
        />
        <p>Error al cargar datos.</p>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="App">
      <Header scroll={120} blur={175} />
      <main
        className={`max-w-screen-xl flex gap-[50px] m-auto flex-col ${scrolled ? "mt-[345px]" : "mt-[50px]"
          } min-h-screen`}
      >
        {/* Barra de búsqueda y filtro */}
        <section className="w-full border-2 border-secondaryColor flex justify-between items-center py-5 px-[15px] rounded-lg">
          <div className="flex border-tertiaryColor border-2 py-[5px] px-[9px] rounded-lg w-96 h-8">
            <img src="/icons/home/searchIcon.svg" alt="search icon" />
            <input
              type="text"
              className="w-full pl-[5px]"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownComponent
            label="Filtrar por categoría"
            options={options}
            onSelect={(value) => setFilter(value.toString())}
          />
        </section>
        <Button
          className="px-2.5 py-1.5 bg-gray-400 text-white rounded-md w-64"
          text={"Crear nuevo producto"}
          link="/new"
          blank={false}
        />
        {/* Renderizar secciones de productos */}
        {visibleCategoryIds
          .filter((categoryId) => (filter ? categoryId === filter : true)) // Aplicar filtro
          .map((categoryId) => (
            <section key={categoryId} className="flex gap-[30px] flex-col">
              <div className="flex justify-between">
                <h2 className="font-semibold text-xl">
                  {categoryMap?.[parseInt(categoryId)] || `Categoría ${categoryId}`}
                </h2>
              </div>
              <div className="flex gap-x-5 gap-y-[50px] flex-wrap">
                {groupedProducts[categoryId]?.map((product) => (
                  <div
                    key={product.id}
                    className="relative w-[305px] p-4 bg-white rounded-lg shadow-cardHomeShadow flex flex-col items-center"
                  >
                    <CardMainComponent
                      id={product.id}
                      title={product.name}
                      image_url={product.images[0]}
                      price={`$${product.price}`}
                      description={product.description}
                    />
                    <AddToCartButton
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      category_id={product.category_id}
                      className={"px-2.5 py-1.5 bg-gray-400 mt-5 text-white rounded-md w-full"}
                      image_url={product.images}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        <div className="text-center">
          <button
            onClick={handleShowMore}
            className={`px-2.5 py-1.5 bg-gray-400 mt-5 text-white rounded-md w-[220px] ${((Object.keys(groupedProducts).length && Object.keys(groupedProducts).length <= 2) || (visibleCategoryIds.length >= Object.keys(groupedProducts).length)) ? "hidden" : "block"}`}
          >
            Ver más categorias
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;