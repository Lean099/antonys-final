function TableData({ columns, data, onEdit, onDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id_cliente || item.id_producto || item.id_pedido}>
            {Object.values(item).map((val, i) => (
              <td key={i}>{val}</td>
            ))}
            <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(item)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() =>
                  onDelete(
                    item.id_cliente || item.id_producto || item.id_pedido
                  )
                }
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default TableData;
