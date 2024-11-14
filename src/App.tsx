import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/App";
import CreateNewProduct from "./pages/createNewProduct/createNewProduct";
import { ScrollProvider } from "./hooks/ScrollContext";

const App: React.FC = () => {
  return (
    <ScrollProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<CreateNewProduct />} />
        </Routes>
      </BrowserRouter>
    </ScrollProvider>
  );
};

export default App;
