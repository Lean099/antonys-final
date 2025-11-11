import sqlite3

# Conexión al archivo de base de datos SQLite
def get_connection():
    connection = sqlite3.connect("antonys.db")
    connection.row_factory = sqlite3.Row  # Permite acceder a los datos como diccionario
    return connection