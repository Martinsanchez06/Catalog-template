import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/App";
import { ScrollProvider } from "./hooks/ScrollContext";
import CreateNewProduct from "./pages/createNewProduct/createNewProduct";
import Test from "./test";

const App: React.FC = () => {
  return (
    <ScrollProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<CreateNewProduct />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </ScrollProvider>
  );
};

export default App;
