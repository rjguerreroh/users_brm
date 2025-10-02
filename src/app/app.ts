import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Routes } from './router';
import { initializeDatabase } from '../config/typeorm';
import { setupSwagger } from '../swagger/swagger.docs';

class App {
  private app: express.Application;
  private port: number;
  private nodeEnv: string;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env['PORT'] || '3000');
    this.nodeEnv = process.env['NODE_ENV'] || 'development';
  }

  public async init(): Promise<void> {
    try {
      // Inicializar TypeORM
      await initializeDatabase();

      // Middleware de seguridad
      this.app.use(helmet());
      this.app.use(cors());
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));

      // Rutas básicas
      /**
       * @swagger
       * /:
       *   get:
       *     summary: Información de la API
       *     description: Obtiene información básica sobre la API
       *     tags: [General]
       *     responses:
       *       200:
       *         description: Información de la API
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 message:
       *                   type: string
       *                   example: "API de Usuarios funcionando correctamente"
       *                 version:
       *                   type: string
       *                   example: "1.0.0"
       *                 timestamp:
       *                   type: string
       *                   format: date-time
       *                   example: "2024-01-15T10:30:00.000Z"
       */
      this.app.get('/', (req, res) => {
        console.log(req.originalUrl);
        res.json({
          message: 'API de Usuarios funcionando correctamente',
          version: '1.0.0',
          timestamp: new Date().toISOString()
        });
      });

      /**
       * @swagger
       * /health:
       *   get:
       *     summary: Health Check
       *     description: Verifica el estado de la API
       *     tags: [General]
       *     responses:
       *       200:
       *         description: API funcionando correctamente
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 status:
       *                   type: string
       *                   example: "OK"
       *                 uptime:
       *                   type: number
       *                   example: 123.456
       *                 timestamp:
       *                   type: string
       *                   format: date-time
       *                   example: "2024-01-15T10:30:00.000Z"
       */
      this.app.get('/health', (req, res) => {
        console.log(req.originalUrl);
        res.json({
          status: 'OK',
          uptime: process.uptime(),
          timestamp: new Date().toISOString()
        });
      });

      // Configurar Swagger
      setupSwagger(this.app);

      // Inicializar rutas
      const routes = new Routes(this.app);
      routes.init();

      // Manejo de errores 404
      this.app.use('*', (req, res) => {
        res.status(404).json({
          error: 'Ruta no encontrada',
          path: req.originalUrl,
          method: req.method
        });
      });

      // Manejo global de errores
      this.app.use((err: Error, _req: express.Request, res: express.Response, _next: any) => {
        console.error('Error:', err);
        res.status(500).json({
          error: 'Error interno del servidor',
          message: this.nodeEnv === 'development' ? err.message : 'Algo salió mal'
        });
      });

      // Iniciar servidor
      this.app.listen(this.port, () => {
        console.log(`Servidor ejecutándose en http://localhost:${this.port}`);
        console.log(`Health check disponible en http://localhost:${this.port}/health`);
        console.log(`Entorno: ${this.nodeEnv}`);
        console.log(`🗄️ Base de datos: PostgreSQL con TypeORM conectada`);
        console.log('\n');
        console.log('ENDPOINTS');
        console.log('='.repeat(80));
        console.log('\n ENDPOINTS GENERALES:');
        console.log(`  GET  http://localhost:${this.port}/           - Información de la API`);
        console.log(`  GET  http://localhost:${this.port}/health      - Health check`);
        console.log('\n DOCUMENTACIÓN:');
        console.log(`  GET    http://localhost:${this.port}/api-docs         - Documentación Swagger UI`);
        console.log(`  GET    http://localhost:${this.port}/api-docs.json    - Especificación OpenAPI JSON`);
        console.log('\n ENDPOINTS DE USUARIOS:');
        console.log(`  GET    http://localhost:${this.port}/api/users        - Listar usuarios (con paginación: ?page=1&limit=10)`);
        console.log(`  GET    http://localhost:${this.port}/api/users/search - Búsqueda avanzada (filtros, ordenamiento, paginación)`);
        console.log(`  GET    http://localhost:${this.port}/api/users/:id   - Obtener usuario por ID`);
        console.log(`  POST   http://localhost:${this.port}/api/users       - Crear nuevo usuario`);
        console.log(`  PUT    http://localhost:${this.port}/api/users/:id   - Actualizar usuario`);
        console.log(`  DELETE http://localhost:${this.port}/api/users/:id   - Eliminar usuario`);
        
        console.log('\n EJEMPLOS DE USO:');
        console.log(`  Paginación:     curl "http://localhost:${this.port}/api/users?page=2&limit=5"`);
        console.log(`  Búsqueda:       curl "http://localhost:${this.port}/api/users/search?search=Juan"`);
        console.log(`  Filtros:         curl "http://localhost:${this.port}/api/users/search?ageMin=25&ageMax=30"`);
        console.log(`  Ordenamiento:    curl "http://localhost:${this.port}/api/users/search?sortBy=name&sortOrder=ASC"`);
      });

    } catch (error) {
      console.error('ERROR: Error al inicializar el servidor:', error);
      process.exit(1);
    }
  }
}

export { App };