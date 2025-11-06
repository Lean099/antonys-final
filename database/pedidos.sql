CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo ENUM('local', 'delivery') NOT NULL,
    estado ENUM('pendiente', 'en_preparacion', 'entregado', 'cancelado') DEFAULT 'pendiente',
    productos JSON,  -- aquí guardaremos los productos y cantidades en formato JSON
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);