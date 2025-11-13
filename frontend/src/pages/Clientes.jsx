import { useEffect, useState } from 'react';
import { getData, postData, putData, deleteData } from '../services/api';
import TableData from '../components/TableData';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    email: '',
    tipo_cliente: '',
  });

  // Cargar datos desde el backend
  const cargarDatos = async () => {
    const data = await getData('clientes');
    setClientes(data);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Abrir modal para nuevo cliente
  const abrirNuevo = () => {
    setForm({
      nombre: '',
      telefono: '',
      direccion: '',
      email: '',
      tipo_cliente: '',
    });
    setEditing(null);
    setShowModal(true);
  };

  // Abrir modal para editar cliente
  const abrirEditar = (cliente) => {
    setForm(cliente);
    setEditing(cliente.id_cliente);
    setShowModal(true);
  };

  // Guardar (crear o editar)
  const guardar = async () => {
    if (!form.nombre) {
      alert('Completa el nombre.');
      return;
    }
    if (editing) {
      await putData('clientes', editing, form);
    } else {
      await postData('clientes', form);
    }
    setShowModal(false);
    cargarDatos();
  };

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar cliente?')) return;
    await deleteData('clientes', id);
    cargarDatos();
  };

  return (
    <main>
      <h3>Gestión de Clientes</h3>
      <button className="btn btn-primary mb-3" onClick={abrirNuevo}>
        Agregar Cliente
      </button>

      <TableData
        idKey="id_cliente"
        columns={[
          'ID',
          'Nombre',
          'Teléfono',
          'Dirección',
          'Email',
          'Tipo',
          'Acciones',
        ]}
        data={clientes}
        onDelete={eliminar}
        onEdit={abrirEditar}
      />

      {/* Modal manual dentro del mismo componente */}
      {showModal && (
        <>
          <div
            className="modal-backdrop fade show"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1040,
            }}
          ></div>

          <div
            className="modal d-block"
            tabIndex="-1"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1050,
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editing ? 'Editar Cliente' : 'Nuevo Cliente'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <input
                    className="form-control mb-2"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={(e) =>
                      setForm({ ...form, nombre: e.target.value })
                    }
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Teléfono"
                    value={form.telefono}
                    onChange={(e) =>
                      setForm({ ...form, telefono: e.target.value })
                    }
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Dirección"
                    value={form.direccion}
                    onChange={(e) =>
                      setForm({ ...form, direccion: e.target.value })
                    }
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Tipo de cliente"
                    value={form.tipo_cliente}
                    onChange={(e) =>
                      setForm({ ...form, tipo_cliente: e.target.value })
                    }
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

export default Clientes;
