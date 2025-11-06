CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(150),
    email VARCHAR(100),
    tipo_cliente ENUM('local', 'delivery') DEFAULT 'local'
);