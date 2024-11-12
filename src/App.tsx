import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/App";
import Test from "./pages/test/test";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
