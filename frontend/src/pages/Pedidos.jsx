import { useEffect, useState } from "react";
import { getData, postData, putData, deleteData } from "../services/api";
import TableData from "../components/TableData";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    id_cliente: "",
    fecha: "",
    tipo: "Delivery",
    estado: "Pendiente",
    productos: "",
    total: "",
  });

  const cargarDatos = async () => {
    const data = await getData("pedidos");
    setPedidos(data);
  };

  const cargarClientes = async () => {
    const data = await getData("clientes");
    setClientes(data);
  };

  useEffect(() => {
    cargarDatos();
    cargarClientes();
  }, []);

  const abrirNuevo = () => {
    setForm({
      id_cliente: "",
      fecha: "",
      tipo: "Delivery",
      estado: "Pendiente",
      productos: "",
      total: "",
    });
    setEditing(null);
    setShowModal(true);
  };

  const abrirEditar = (pedido) => {
    setForm(pedido);
    setEditing(pedido.id_pedido);
    setShowModal(true);
  };

  const guardar = async () => {
    if (!form.id_cliente || !form.productos || !form.total) {
      alert("Completa cliente, productos y total.");
      return;
    }

    const dataToSend = {
      ...form,
      id_cliente: parseInt(form.id_cliente),
      total: parseFloat(form.total),
      fecha: form.fecha || new Date().toISOString().split("T")[0],
    };

    if (editing) {
      await putData("pedidos", editing, dataToSend);
    } else {
      await postData("pedidos", dataToSend);
    }

    setShowModal(false);
    cargarDatos();
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar pedido?")) return;
    await deleteData("pedidos", id);
    cargarDatos();
  };

  return (
    <main>
      <h3>Gestión de Pedidos</h3>
      <button className="btn btn-primary mb-3" onClick={abrirNuevo}>
        Agregar Pedido
      </button>

      <TableData
        idKey="id_pedido"
        columns={["ID", "ID Cliente", "Fecha", "Tipo", "Estado", "Productos", "Total", "Acciones"]}
        data={pedidos}
        onDelete={eliminar}
        onEdit={abrirEditar}
      />

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
                    {editing ? "Editar Pedido" : "Nuevo Pedido"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <select
                    className="form-select mb-2"
                    value={form.id_cliente}
                    onChange={(e) => setForm({ ...form, id_cliente: e.target.value })}
                  >
                    <option value="">Seleccionar cliente</option>
                    {clientes.map((c) => (
                      <option key={c.id_cliente} value={c.id_cliente}>
                        {c.nombre} ({c.telefono})
                      </option>
                    ))}
                  </select>

                  <input
                    className="form-control mb-2"
                    type="date"
                    value={form.fecha}
                    onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                  />

                  <select
                    className="form-select mb-2"
                    value={form.tipo}
                    onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                  >
                    <option>Delivery</option>
                    <option>En local</option>
                  </select>

                  <select
                    className="form-select mb-2"
                    value={form.estado}
                    onChange={(e) => setForm({ ...form, estado: e.target.value })}
                  >
                    <option>Pendiente</option>
                    <option>En preparación</option>
                    <option>Entregado</option>
                    <option>Cancelado</option>
                  </select>

                  <textarea
                    className="form-control mb-2"
                    placeholder="Productos (ej: Pizza x1, Coca Cola x2)"
                    value={form.productos}
                    onChange={(e) => setForm({ ...form, productos: e.target.value })}
                  ></textarea>

                  <input
                    className="form-control mb-2"
                    placeholder="Total"
                    value={form.total}
                    onChange={(e) => setForm({ ...form, total: e.target.value })}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
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

export default Pedidos;
