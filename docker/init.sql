-- Script de inicialización para PostgreSQL
-- Este archivo se ejecuta automáticamente cuando se crea el contenedor

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER NOT NULL CHECK (age > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insertar datos de ejemplo
INSERT INTO users (name, email, age) VALUES
    ('Juan Pérez', 'juan@example.com', 30),
    ('María García', 'maria@example.com', 25),
    ('Carlos López', 'carlos@example.com', 28)
ON CONFLICT (email) DO NOTHING;

-- Mostrar información de la base de datos
SELECT 'Base de datos inicializada correctamente' as status;
SELECT COUNT(*) as total_users FROM users;
