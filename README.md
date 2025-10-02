# Users API

API REST para gestión de usuarios desarrollada con Node.js, TypeScript y PostgreSQL.

## Características

- **Framework**: Express.js con TypeScript
- **Base de datos**: PostgreSQL con TypeORM
- **Validación**: Joi para validación de datos
- **Arquitectura**: Clean Architecture con inyección de dependencias
- **Seguridad**: Helmet para headers de seguridad
- **CORS**: Configurado para desarrollo
- **Docker**: Configuración completa con Docker Compose
- **Seeders**: Sistema de datos de prueba con 20 usuarios realistas
- **Testing**: Suite completa de tests unitarios (109 tests)
- **Paginación**: Sistema de paginación avanzado
- **Búsqueda**: Endpoint de búsqueda avanzada con filtros
- **Documentación**: Swagger UI integrado para documentación interactiva

## Inicio de la app

```bash
# 1. Clonar e instalar
git clone <repository-url>
cd users
npm install

# 2. Configurar base de datos
npm run docker:up
npm run migration:run
npm run seed:run

# 3. Iniciar aplicación
npm run dev

# 4. Probar endpoints
curl http://localhost:3000/api/users

# 5. Acceder a la documentación Swagger
# Abrir en el navegador: http://localhost:3000/api-docs
```

## Requisitos

- Node.js (v18 o superior)
- PostgreSQL
- Docker y Docker Compose (opcional)

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd users
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Editar el archivo `.env` con tus configuraciones:
   ```env
   NODE_ENV=development
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=password
   DB_DATABASE=users_db
   ```

4. **Configurar base de datos**

   **Opción A: Con Docker (Recomendado)**
   ```bash
   # Levantar servicios de base de datos
   npm run docker:up
   
   # Ejecutar migraciones
   npm run migration:run
   
   # Poblar con datos de prueba
   npm run seed:run
   ```

   **Opción B: PostgreSQL local**
   - Crear base de datos: `users_db`
   - Ejecutar migraciones: `npm run migration:run`
   - Poblar con datos: `npm run seed:run`

## Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

### Documentación interactiva
```bash
# Iniciar la aplicación
npm run dev

# Acceder a Swagger UI
# Abrir: http://localhost:3000/api-docs
# Probar endpoints directamente desde el navegador
```

### Scripts disponibles
```bash
npm run dev          # Desarrollo con hot reload
npm run build        # Compilar TypeScript
npm run start        # Ejecutar en producción
npm run watch        # Desarrollo con watch mode
npm run clean        # Limpiar directorio dist
```

### Seeders (Datos de prueba)
```bash
npm run seed:run     # Ejecutar seeders (solo si no hay datos)
npm run seed:reset   # Limpiar y volver a ejecutar seeders
npm run seed:clear   # Limpiar todos los datos
```

### Docker
```bash
npm run docker:up      # Levantar servicios
npm run docker:down    # Detener servicios
npm run docker:logs    # Ver logs
npm run docker:restart # Reiniciar servicios
npm run docker:clean   # Limpiar volúmenes
```

## API Endpoints

### Información general
- `GET /` - Información de la API
- `GET /health` - Health check

### Documentación
- `GET /api-docs` - Documentación Swagger UI interactiva
- `GET /api-docs.json` - Especificación OpenAPI JSON

### Usuarios
- `GET /api/users` - Listar todos los usuarios (con paginación)
- `GET /api/users/search` - Búsqueda avanzada de usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

```json
{
  "success": true,
  "data": {
    "data": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "totalPages": 1,
      "hasNext": false,
      "hasPrev": false
    },
    "filters": {
      "search": "Juan",
      "ageMin": 25,
      "sortBy": "name",
      "sortOrder": "ASC"
    }
  },
  "message": "Se encontraron 5 usuarios con los filtros aplicados (página 1 de 1)"
}
```

## Estructura del proyecto

```
src/
├── app/             # Aplicación principal
│   ├── __tests__/   # Tests unitarios
│   ├── users/       # Módulo de usuarios
│   │   ├── controllers/  # Controladores
│   │   ├── entities/     # Entidades TypeORM
│   │   ├── interfaces/   # Interfaces TypeScript
│   │   ├── middleware/   # Middleware de validación
│   │   ├── models/       # Modelos de datos
│   │   ├── routes/       # Definición de rutas
│   │   ├── schemas/      # Esquemas de validación Joi
│   │   └── services/     # Lógica de negocio
│   ├── seeders/     # Sistema de datos de prueba
│   ├── app.ts       # Configuración de Express
│   ├── router.ts    # Router principal
│   └── server.ts    # Punto de entrada
├── config/          # Configuración de base de datos y DI
├── swagger/         # Documentación Swagger
│   ├── swagger.ts   # Configuración principal
│   └── userRoutes.swagger.ts  # Anotaciones de usuarios
└── index.ts         # Punto de entrada de la aplicación
```

## 📚 Documentación Swagger

La API incluye documentación interactiva completa con Swagger UI:

### Acceso a la documentación
- **Swagger UI**: `http://localhost:3000/api-docs` - Interfaz interactiva
- **OpenAPI JSON**: `http://localhost:3000/api-docs.json` - Especificación completa

### Características de la documentación
- **Interfaz interactiva**: Prueba los endpoints directamente desde el navegador
- **Esquemas simplificados**: Documentación clara sin complejidad innecesaria
- **Parámetros reutilizables**: Definiciones centralizadas para paginación, búsqueda y filtros
- **Ejemplos de uso**: Request/response examples para cada endpoint
- **Códigos de estado**: Documentación completa de respuestas y errores
- **Validación visual**: Esquemas de validación para request bodies

### Estructura de documentación
```
src/swagger/
├── swagger.ts                    # Configuración principal de Swagger
└── userRoutes.swagger.ts        # Anotaciones para endpoints de usuarios
```

### Endpoints documentados
- **General**: `/`, `/health` - Información y estado de la API
- **Usuarios**: CRUD completo con paginación y búsqueda avanzada
- **Parámetros**: Paginación, filtros, ordenamiento y búsqueda
- **Respuestas**: Esquemas de éxito y error para todos los endpoints

## 🔧 Tecnologías utilizadas

- Node.js
- TypeScript
- Express.js
- TypeORM
- PostgreSQL
- Joi
- Docker
- Helmet
- CORS
- Swagger UI
- Swagger JSDoc

## Modelo de datos

### Usuario
```typescript
{
  id: number (auto-increment)
  name: string (máximo 255 caracteres)
  email: string (único, máximo 255 caracteres)
  age: number
  createdAt: Date (automático)
  updatedAt: Date (automático)
}
```

## Testing

Suite completa de testing con **109 tests** que cubren toda la funcionalidad:

```bash
# Ejecutar todos los tests
npm test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

### Cobertura de tests

- **UserService**: Tests unitarios para lógica de negocio
- **UserController**: Tests de controladores y validación
- **UserRoutes**: Tests de rutas y middleware
- **UserSearch**: Tests de búsqueda avanzada y paginación
- **Seeders**: Tests de seeders y manejo de datos
- **DIContainer**: Tests de inyección de dependencias

### Estructura de tests

```
src/app/__tests__/
├── index.test.ts                    # Suite principal
├── users/                          # Tests de usuarios
│   ├── UserService.simple.test.ts
│   ├── UserController.simple.test.ts
│   ├── UserRoutes.simple.test.ts
│   └── UserSearch.simple.test.ts
└── seeders/                        # Tests de seeders
    ├── UserSeeder.simple.test.ts
    └── SeederRunner.simple.test.ts
```

## Migraciones

```bash
# Generar migración
npm run migration:generate -- -n NombreMigracion

# Ejecutar migraciones
npm run migration:run

# Revertir migración
npm run migration:revert
```

## Seeders


### Comandos disponibles

```bash
# Ejecutar seeders (solo si la base de datos está vacía)
npm run seed:run

# Limpiar datos existentes y ejecutar seeders
npm run seed:reset

# Limpiar todos los datos sin crear nuevos
npm run seed:clear
```

### Datos creados

Los seeders crean **20 usuarios de prueba** con:
- **Nombres realistas en español**: Juan Pérez, María García, etc.
- **Emails únicos**: Formato `nombre.apellido@example.com`
- **Edades variadas**: Entre 24-35 años para testing
- **Datos consistentes**: Estructura uniforme para pruebas
- **Validación automática**: No duplica datos existentes

### Características técnicas

- **Detección inteligente**: Verifica si ya existen datos antes de crear
- **Manejo de errores**: Logs detallados y manejo de excepciones
- **Transacciones**: Operaciones atómicas para consistencia
- **Logging completo**: Progreso detallado durante la ejecución
- **Tests incluidos**: Cobertura completa con mocks

### Ejemplo de uso completo

```bash
# 1. Levantar la base de datos
npm run docker:up

# 2. Ejecutar migraciones
npm run migration:run

# 3. Poblar con datos de prueba
npm run seed:run

# 4. Iniciar la aplicación
npm run dev

# 5. Verificar datos (opcional)
curl http://localhost:3000/api/users
```

### Estructura de seeders

```
src/app/seeders/
├── index.ts                    # Runner principal de seeders
├── UserSeeder.ts               # Seeder para usuarios
└── __tests__/                  # Tests para seeders
    ├── UserSeeder.simple.test.ts
    └── SeederRunner.simple.test.ts
```

## Funciones y caracteristicas

### Búsqueda
- **Filtros múltiples**: Por nombre, email, edad, fechas
- **Búsqueda de texto**: ILIKE para búsquedas flexibles
- **Ordenamiento**: Por cualquier campo (ASC/DESC)
- **Paginación**: Control total sobre resultados
- **Validación**: Parámetros validados con Joi

### Paginación
- **Metadatos completos**: Total, páginas, navegación
- **Límites configurables**: 1-100 elementos por página
- **Navegación**: hasNext, hasPrev para UI
- **Performance**: Consultas optimizadas con LIMIT/OFFSET

### Testing
- **109 tests** cubriendo toda la funcionalidad
- **Mocks inteligentes**: TypeORM, Express, DIContainer
- **Cobertura completa**: Services, Controllers, Routes, Seeders
- **Tests de integración**: Endpoints reales con supertest

### Seeders
- **Detección automática**: No duplica datos existentes
- **Datos realistas**: 20 usuarios con nombres españoles
- **Manejo de errores**: Logs detallados y rollback
- **Transacciones**: Operaciones atómicas garantizadas

### Arquitectura
- **Inyección de dependencias**: DIContainer para gestión
- **Separación de responsabilidades**: Services, Controllers, Routes
- **Validación centralizada**: Joi schemas reutilizables
- **Manejo de errores**: Respuestas consistentes y informativas

## Despliegue

### Docker
```bash
# Construir imagen
docker build -t users-api .

# Ejecutar contenedor
docker run -p 3000:3000 users-api
```

### Variables de entorno para producción
```env
NODE_ENV=production
PORT=3000
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_DATABASE=your-database
```
