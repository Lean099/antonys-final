from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importar los endpoints de cada archivo
from routes.clientes_routes import router as clientes_router
from routes.productos_routes import router as productos_router
from routes.pedidos_routes import router as pedidos_router

app = FastAPI(title="Antonys Backend 🍕")

# === Configuración de CORS ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # permitir todo (para pruebas)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Rutas principales (unificamos todas) ===
app.include_router(clientes_router)
app.include_router(productos_router)
app.include_router(pedidos_router)

@app.get("/")
def home():
    return {"message": "Servidor FastAPI funcionando correctamente 🚀"}
