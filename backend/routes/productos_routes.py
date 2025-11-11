from fastapi import APIRouter, HTTPException
from database import get_connection

router = APIRouter(prefix="/productos", tags=["Productos"])

@router.get("/")
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
    

@router.post("/")
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

@router.put("/{id_producto}")
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
    

@router.delete("/{id_producto}")
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
