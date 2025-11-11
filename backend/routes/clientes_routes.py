from fastapi import APIRouter, HTTPException
from database import get_connection

router = APIRouter(prefix="/clientes", tags=["Clientes"])

@router.get("/")
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


@router.get("/{id_cliente}")
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


@router.post("/")
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


@router.put("/{id_cliente}")
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


@router.delete("/{id_cliente}")
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
