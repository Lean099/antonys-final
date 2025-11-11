from fastapi import APIRouter, HTTPException
from database import get_connection

router = APIRouter(prefix="/pedidos", tags=["Pedidos"])

@router.get("/")
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

@router.post("/")
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

@router.put("/{id_pedido}")
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

@router.delete("/{id_pedido}")
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
