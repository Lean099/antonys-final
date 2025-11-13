import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Inicio
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/clientes">
            Clientes
          </Link>
          <Link className="nav-link" to="/productos">
            Productos
          </Link>
          <Link className="nav-link" to="/pedidos">
            Pedidos
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
