import { useEffect, useState } from "react";
import { getData, postData, putData, deleteData } from "../services/api";
import TableData from "../components/TableData";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    disponible: 1,
  });

  const cargarDatos = async () => {
    const data = await getData("productos");
    setProductos(data);
  };

  useEffect(() => { cargarDatos(); }, []);

  const abrirNuevo = () => {
    setForm({ nombre: "", categoria: "", precio: "", stock: "", disponible: 1 });
    setEditing(null);
    setShowModal(true);
  };

  const abrirEditar = (producto) => {
    setForm(producto);
    setEditing(producto.id_producto);
    setShowModal(true);
  };

  const guardar = async () => {
    if (!form.nombre || !form.precio) {
      alert("Completa nombre y precio.");
      return;
    }
    if (editing) {
      await putData("productos", editing, form);
    } else {
      await postData("productos", form);
    }
    setShowModal(false);
    cargarDatos();
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    await deleteData("productos", id);
    cargarDatos();
  };

  return (
    <main>
      <h3>Gestión de Productos</h3>
      <button className="btn btn-primary mb-3" onClick={abrirNuevo}>
        Agregar Producto
      </button>

      <TableData
        idKey="id_producto"
        columns={["ID", "Nombre", "Categoría", "Precio", "Stock", "Disponible", "Acciones"]}
        data={productos}
        onDelete={eliminar}
        onEdit={abrirEditar}
      />

      {/* Modal interno */}
      {showModal && (
        <>
          <div
            className="modal-backdrop fade show"
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1040,
            }}
          ></div>

          <div
            className="modal d-block"
            tabIndex="-1"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1050,
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editing ? "Editar Producto" : "Nuevo Producto"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <input className="form-control mb-2" placeholder="Nombre"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                  <input className="form-control mb-2" placeholder="Categoría"
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value })} />
                  <input className="form-control mb-2" placeholder="Precio"
                    value={form.precio}
                    onChange={(e) => setForm({ ...form, precio: e.target.value })} />
                  <input className="form-control mb-2" placeholder="Stock"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={!!form.disponible}
                      onChange={(e) =>
                        setForm({ ...form, disponible: e.target.checked ? 1 : 0 })
                      }
                      id="disp"
                    />
                    <label className="form-check-label" htmlFor="disp">
                      Disponible
                    </label>
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button className="btn btn-primary" onClick={guardar}>
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Productos;
