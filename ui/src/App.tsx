import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollProvider } from "./hooks/ScrollContext";
import CreateNewProduct from "./pages/createNewProduct/createNewProduct";
import ProductDetailPage from "./pages/productDetails/ProductDetails";
import EditProductPage from "./pages/editiProduct/EditProductForm";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Test from "./components/test";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ScrollProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<CreateNewProduct />} />
              <Route path="/test" element={<Test />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/products/edit/:id" element={<EditProductPage />} />
            </Routes>
          </BrowserRouter>
        </ScrollProvider>
      </QueryClientProvider>
    </Provider>

  );
};

export default App;
