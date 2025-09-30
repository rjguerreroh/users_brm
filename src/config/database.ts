import { Pool, PoolConfig } from 'pg';

const dbConfig: PoolConfig = {
  host: process.env['DB_HOST'] || 'localhost',
  port: parseInt(process.env['DB_PORT'] || '5432'),
  database: process.env['DB_NAME'] || 'users_db',
  user: process.env['DB_USER'] || 'postgres',
  password: process.env['DB_PASSWORD'] || 'password',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Crear el pool de conexiones
export const pool = new Pool(dbConfig);

// Manejar errores del pool
pool.on('error', (err) => {
  console.error('Error inesperado en el pool de conexiones:', err);
  process.exit(-1);
});

// Función para probar la conexión
export const testConnection = async (): Promise<boolean> => {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log('Conexión a PostgreSQL establecida correctamente');
    return true;
  } catch (error) {
    console.error('ERROR: Error al conectar con PostgreSQL:', error);
    return false;
  }
};

// Función para cerrar el pool
export const closePool = async (): Promise<void> => {
  try {
    await pool.end();
    console.log('🔌 Pool de conexiones cerrado');
  } catch (error) {
    console.error('Error al cerrar el pool:', error);
  }
};
