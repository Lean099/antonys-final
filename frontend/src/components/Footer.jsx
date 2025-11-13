// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="text-white text-center py-3 mt-4">
      <div className="container">
        <p className="mb-1 fw-bold">🍔 Antony’s - Sistema de Gestión</p>
        <p className="mb-0">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
