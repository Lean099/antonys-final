function Home() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center bg-light"
      style={{
        minHeight: "70vh",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 className="mb-3">
        🍔 Bienvenido a Antony’s - Sistema de Gestión
      </h2>
      <p className="lead mb-3 text-dark">
        Administrá tus <strong>clientes</strong>, <strong>productos</strong> y{" "}
        <strong>pedidos</strong> desde un solo lugar.
      </p>
      <p className="text-secondary">
        Usá el menú superior para navegar por las secciones del sistema.
      </p>
    </div>
  );
}

export default Home;