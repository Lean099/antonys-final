// src/components/Header.jsx
import { useState, useEffect } from "react";
import logo from '../assets/image.png'

function Header() {
  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    // Actualiza la hora cada segundo
    const intervalo = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalo);
  }, []);

  // Formateamos la fecha y hora en formato argentino
  const fecha = fechaHora.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const hora = fechaHora.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="bg-dark text-white py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        <div>
          <h1 className="h3 mb-0 "><img src={logo} alt="Logo" className="ms-5" width={130} /></h1>
          <small>Sistema de gestión del local de comidas</small>
        </div>
        <div className="text-end">
          <div>{fecha.charAt(0).toUpperCase() + fecha.slice(1)}</div>
          <div className="fw-bold">{hora}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
