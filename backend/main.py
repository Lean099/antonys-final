from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_connection

app = FastAPI(title="Antonys Backend 🍔")

# === Configuración CORS (para permitir conexión con React) ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # en producción se puede restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
#                ENDPOINTS DE CLIENTES
# ============================================================

@app.get("/clientes")
def obtener_clientes():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM clientes")
        rows = cursor.fetchall()
        conn.close()
        return [dict(row) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/clientes/{id_cliente}")
def obtener_cliente(id_cliente: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM clientes WHERE id_cliente = ?", (id_cliente,))
        row = cursor.fetchone()
        conn.close()
        if row:
            return dict(row)
        else:
            raise HTTPException(status_code=404, detail="Cliente no encontrado")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/clientes")
def agregar_cliente(cliente: dict):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO clientes (nombre, telefono, direccion, email, tipo_cliente) VALUES (?, ?, ?, ?, ?)",
            (cliente["nombre"], cliente["telefono"], cliente["direccion"], cliente["email"], cliente["tipo_cliente"]),
        )
        conn.commit()
        conn.close()
        return {"mensaje": "Cliente agregado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/clientes/{id_cliente}")
def actualizar_cliente(id_cliente: int, cliente: dict):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            """UPDATE clientes SET nombre=?, telefono=?, direccion=?, email=?, tipo_cliente=? WHERE id_cliente=?""",
            (cliente["nombre"], cliente["telefono"], cliente["direccion"], cliente["email"], cliente["tipo_cliente"], id_cliente),
        )
        conn.commit()
        conn.close()
        return {"mensaje": "Cliente actualizado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/clientes/{id_cliente}")
def eliminar_cliente(id_cliente: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM clientes WHERE id_cliente = ?", (id_cliente,))
        conn.commit()
        conn.close()
        return {"mensaje": "Cliente eliminado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================
#                ENDPOINTS DE PRODUCTOS
# ============================================================

@app.get("/productos")
def obtener_productos():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM productos")
        rows = cursor.fetchall()
        conn.close()
        return [dict(row) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/productos")
def agregar_producto(producto: dict):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO productos (nombre, categoria, precio, stock, disponible) VALUES (?, ?, ?, ?, ?)",
            (producto["nombre"], producto["categoria"], producto["precio"], producto["stock"], producto["disponible"]),
        )
        conn.commit()
        conn.close()
        return {"mensaje": "Producto agregado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/productos/{id_producto}")
def actualizar_producto(id_producto: int, producto: dict):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            """UPDATE productos SET nombre=?, categoria=?, precio=?, stock=?, disponible=? WHERE id_producto=?""",
            (producto["nombre"], producto["categoria"], producto["precio"], producto["stock"], producto["disponible"], id_producto),
        )
        conn.commit()
        conn.close()
        return {"mensaje": "Producto actualizado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/productos/{id_producto}")
def eliminar_producto(id_producto: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM productos WHERE id_producto = ?", (id_producto,))
        conn.commit()
        conn.close()
        return {"mensaje": "Producto eliminado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================
#                ENDPOINTS DE PEDIDOS
# ============================================================

@app.get("/pedidos")
def obtener_pedidos():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM pedidos")
        rows = cursor.fetchall()
        conn.close()
        return [dict(row) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/pedidos")
def agregar_pedido(pedido: dict):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            """INSERT INTO pedidos (id_cliente, fecha, tipo, estado, productos, total)
               VALUES (?, ?, ?, ?, ?, ?)""",
            (pedido["id_cliente"], pedido["fecha"], pedido["tipo"], pedido["estado"], pedido["productos"], pedido["total"]),
        )
        conn.commit()
        conn.close()
        return {"mensaje": "Pedido agregado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/pedidos/{id_pedido}")
def actualizar_pedido(id_pedido: int, pedido: dict):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            """UPDATE pedidos
               SET id_cliente=?, fecha=?, tipo=?, estado=?, productos=?, total=?
               WHERE id_pedido=?""",
            (pedido["id_cliente"], pedido["fecha"], pedido["tipo"], pedido["estado"], pedido["productos"], pedido["total"], id_pedido),
        )
        conn.commit()
        conn.close()
        return {"mensaje": "Pedido actualizado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/pedidos/{id_pedido}")
def eliminar_pedido(id_pedido: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM pedidos WHERE id_pedido = ?", (id_pedido,))
        conn.commit()
        conn.close()
        return {"mensaje": "Pedido eliminado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
