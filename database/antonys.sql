-- ======================================
-- CREACIÓN DE TABLAS
-- ======================================

DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS clientes;

-- Tabla CLIENTES
CREATE TABLE clientes (
    id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT,
    direccion TEXT,
    email TEXT,
    tipo_cliente TEXT DEFAULT 'local'
);

-- Tabla PRODUCTOS
CREATE TABLE productos (
    id_producto INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    categoria TEXT NOT NULL,
    precio REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    disponible INTEGER DEFAULT 1
);

-- Tabla PEDIDOS
CREATE TABLE pedidos (
    id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cliente INTEGER,
    fecha TEXT,
    tipo TEXT,
    estado TEXT,
    productos TEXT,
    total REAL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);


-- Datos aleatorios para la tabla CLIENTES

INSERT INTO clientes (nombre, telefono, direccion, email, tipo_cliente) VALUES
('Juan Pérez', '3512345678', 'Av. San Martín 123', 'juanp@gmail.com', 'local'),
('María López', '3518765432', 'Bv. Las Heras 456', 'mlopez@gmail.com', 'delivery'),
('Lucas Gómez', '3514567890', 'Av. Colón 999', 'lucasg@gmail.com', 'delivery'),
('Ana Torres', '3512223344', 'Ruta 9 km 12', 'ana_t@gmail.com', 'local'),
('Carlos Díaz', '3519988776', 'Catamarca 321', 'cdiaz@gmail.com', 'local'),
('Sofía Romero', '3515544332', 'Belgrano 55', 'sromero@gmail.com', 'delivery'),
('Javier Ramos', '3516677889', 'Sarmiento 820', 'jramos@gmail.com', 'local'),
('Valentina Ruiz', '3511112233', 'Sucre 200', 'valenr@gmail.com', 'delivery'),
('Esteban Molina', '3519996655', 'Independencia 520', 'emolina@gmail.com', 'local'),
('Camila López', '3513332211', 'Ameghino 450', 'clopez@gmail.com', 'local');


-- Datos aleatorios para la tabla PRODUCTOS

INSERT INTO productos (nombre, categoria, precio, stock, disponible) VALUES
('Hamburguesa Clásica', 'Hamburguesa', 3500, 15, 1),
('Pizza Muzarella', 'Pizza', 4200, 10, 1),
('Sandwich de Pollo', 'Sandwich', 3000, 12, 1),
('Hamburguesa Doble', 'Hamburguesa', 4200, 8, 1),
('Pizza Napolitana', 'Pizza', 4500, 10, 1),
('Papas Fritas', 'Acompañamiento', 1500, 20, 1),
('Empanadas de Carne', 'Acompañamiento', 1800, 15, 1),
('Coca Cola 500ml', 'Bebida', 900, 25, 1),
('Agua Mineral 500ml', 'Bebida', 700, 30, 1),
('Hamburguesa BBQ', 'Hamburguesa', 4600, 7, 1);


-- Datos aleatorios para la tabla PEDIDOS

INSERT INTO pedidos (id_cliente, fecha, tipo, estado, productos, total) VALUES
(1, '2025-10-31', 'Delivery', 'Entregado', 'Pizza Muzarella x1', 4200),
(3, '2025-10-31', 'En local', 'Pendiente', 'Hamburguesa Doble x2', 8400),
(2, '2025-10-30', 'Delivery', 'Entregado', 'Sandwich de Pollo x1', 3000),
(4, '2025-10-29', 'En local', 'Entregado', 'Hamburguesa Clásica x3', 10500),
(5, '2025-10-29', 'Delivery', 'Cancelado', 'Pizza Napolitana x1', 4500),
(6, '2025-10-28', 'Delivery', 'Entregado', 'Papas Fritas x2, Coca Cola 500ml x2', 4800),
(7, '2025-10-27', 'En local', 'Pendiente', 'Hamburguesa BBQ x1, Agua Mineral 500ml x1', 5300),
(8, '2025-10-27', 'Delivery', 'Entregado', 'Empanadas de Carne x6', 1800),
(9, '2025-10-26', 'Delivery', 'Entregado', 'Hamburguesa Clásica x2, Coca Cola 500ml x2', 8800),
(10, '2025-10-26', 'En local', 'Entregado', 'Pizza Muzarella x1, Papas Fritas x1', 5700);

