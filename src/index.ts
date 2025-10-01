import 'reflect-metadata';
import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import { initializeDatabase } from './config/typeorm';

const app: Application = express();
const PORT = process.env['PORT'] || 3000;
const NODE_ENV = process.env['NODE_ENV'] || 'development';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas básicas
app.get('/', (req: Request, res: Response) => {
  console.log(req.originalUrl);
  res.json({
    message: 'API de Usuarios funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req: Request, res: Response) => {
  console.log(req.originalUrl);
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Rutas de la API
app.use('/api/users', userRoutes);

// Manejo de errores 404
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

// Manejo global de errores
app.use((err: Error, _req: Request, res: Response, _next: any) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env['NODE_ENV'] === 'development' ? err.message : 'Algo salió mal'
  });
});

// Inicializar base de datos y servidor
const startServer = async () => {
  try {
    // Inicializar TypeORM
    await initializeDatabase();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`Health check disponible en http://localhost:${PORT}/health`);
      console.log(`Entorno: ${NODE_ENV}`);
      console.log(`🗄️ Base de datos: PostgreSQL con TypeORM conectada`);
      console.log('\n');
      console.log('ENDPOINTS');
      console.log('='.repeat(80));
      console.log('\n ENDPOINTS GENERALES:');
      console.log(`  GET  http://localhost:${PORT}/           - Información de la API`);
      console.log(`  GET  http://localhost:${PORT}/health      - Health check`);
      console.log('\n ENDPOINTS DE USUARIOS:');
      console.log(`  GET    http://localhost:${PORT}/api/users     - Listar todos los usuarios`);
      console.log(`  GET    http://localhost:${PORT}/api/users/:id - Obtener usuario por ID`);
      console.log(`  POST   http://localhost:${PORT}/api/users     - Crear nuevo usuario`);
      console.log(`  PUT    http://localhost:${PORT}/api/users/:id - Actualizar usuario`);
      console.log(`  DELETE http://localhost:${PORT}/api/users/:id - Eliminar usuario`);
    });
  } catch (error) {
    console.error('ERROR: Error al inicializar el servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;
