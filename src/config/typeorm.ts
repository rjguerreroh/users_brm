import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../app/users/entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['DB_HOST'] || 'localhost',
  port: parseInt(process.env['DB_PORT'] || '5432'),
  username: process.env['DB_USER'] || 'postgres',
  password: process.env['DB_PASSWORD'] || 'password',
  database: process.env['DB_NAME'] || 'users_db',
  synchronize: process.env['NODE_ENV'] === 'development', // Solo en desarrollo
  logging: process.env['NODE_ENV'] === 'development',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscriber/*.ts'],
});

// Función para inicializar la conexión
export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('TypeORM conectado a PostgreSQL correctamente');
  } catch (error) {
    console.error('Error al conectar con TypeORM:', error);
    throw error;
  }
};

// Función para cerrar la conexión
export const closeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.destroy();
    console.log('Conexión TypeORM cerrada');
  } catch (error) {
    console.error('Error al cerrar TypeORM:', error);
  }
};
