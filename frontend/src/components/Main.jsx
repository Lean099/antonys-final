// src/components/Main.jsx
import React from "react";
import { Outlet } from "react-router-dom";

function Main() {
  // Aquí aplicás el padding/estilo que quieras, y Outlet renderiza la "page" actual
  return (
    <div className="container py-4" style={{ minHeight: "70vh" }}>
      <Outlet />
    </div>
  );
}

export default Main;