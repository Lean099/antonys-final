// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main";

import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Productos from "./pages/Productos";
import Pedidos from "./pages/Pedidos";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />

      {/* Main actúa como layout para todas las páginas */}
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="productos" element={<Productos />} />
          <Route path="pedidos" element={<Pedidos />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
