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
- **Testing**: Suite completa de tests unitarios (83 tests)
- **Paginación**: Sistema de paginación avanzado
- **Búsqueda**: Endpoint de búsqueda avanzada con filtros
- **Documentación**: Swagger UI integrado para documentación interactiva

## Inicio de la app

```bash
# 1. Clonar e instalar
git clone <repository-url>
cd users_brm
npm install

# 2. Configurar variables de entorno
cp .env-example .env

# 3. Levantar base de datos
docker-compose up -d

# 4. Ejecutar migraciones
npm run migration:run

# 5. Poblar con datos de prueba
npm run seed:run

# 6. Iniciar aplicación
npm run dev

# 7. Probar endpoints
curl http://localhost:3000/api/users

# 8. Acceder a la documentación Swagger
# Abrir en el navegador: http://localhost:3000/api-docs
```

## Requisitos

- Node.js (v18 o superior)
- PostgreSQL
- Docker y Docker Compose (opcional)

## Instalación

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
   cp .env-example .env
   ```
   
   El archivo `.env` ya está configurado con los valores correctos para Docker:
   ```env
   NODE_ENV=development
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5433  # Puerto correcto para Docker
   DB_USER=postgres
   DB_PASSWORD=password
   DB_NAME=users_db
   ```

4. **Configurar base de datos**

   **Opción A: Con Docker (Recomendado)**
   ```bash
   # Levantar servicios de base de datos
   docker-compose up -d
   
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

## API Endpoints

### Información general
- `GET /` - Información de la API

### Documentación
- `GET /api-docs` - Documentación Swagger UI

### Usuarios
- `GET /api/users` - Listar todos los usuarios (con paginación)
- `GET /api/users/search` - Búsqueda avanzada de usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario


## Estructura del proyecto

```
src/
├── app/             # Aplicación principal
│   ├── users/       # Módulo de usuarios
│   │   ├── controllers/  # Controladores
│   │   ├── entities/     # Entidades TypeORM
│   │   ├── interfaces/   # Interfaces TypeScript
│   │   ├── middleware/   # Middleware de validación
│   │   ├── models/       # Modelos de datos
│   │   ├── routes/       # Definición de rutas
│   │   ├── schemas/      # Esquemas de validación Joi
│   │   └── services/     # Lógica de negocio
│   ├── app.ts       # Configuración de Express
│   ├── router.ts    # Router principal
│   └── server.ts    # Punto de entrada
├── config/          # Configuración de base de datos
│   ├── container.ts     # Contenedor DI
│   ├── database.ts     # Configuración de base de datos
│   └── typeorm.ts      # Configuración TypeORM
├── tests/           # Tests unitarios
│   ├── users/       # Tests de usuarios
│   │   ├── UserService.test.ts
│   │   ├── UserController.test.ts
│   │   └── UserRoutes.test.ts
│   └── index.test.ts # Suite principal de tests
├── seeders/         # Sistema de datos de prueba
│   └── users.seeders.ts  # Seeder consolidado
├── swagger/         # Documentación Swagger
│   └── swagger.docs.ts   # Configuración y anotaciones consolidadas
└── index.ts         # Punto de entrada de la aplicación
```

## Documentación Swagger

### Acceso a la documentación
- **Swagger UI**: `http://localhost:3000/api-docs`

### Estructura de documentación
```
src/swagger/
└── swagger.docs.ts              # Configuración y anotaciones consolidadas
```

### Endpoints documentados
- **General**: `/` - Información de la API
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

## Testing

```bash
# Ejecutar todos los tests
npm test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

### Cobertura de tests

- **userService**: Tests unitarios para lógica de negocio y búsqueda
- **userController**: Tests de controladores, validación y búsqueda
- **userRoutes**: Tests de rutas y middleware

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

## Funciones y caracteristicas

### Búsqueda
- **Filtros múltiples**: Por nombre, email, edad, fechas
- **Búsqueda de texto**: búsquedas flexibles
- **Ordenamiento**: Por cualquier campo (ASC/DESC)

### Paginación
- **Metadatos completos**: Total, páginas, navegación
- **Límites configurables**: 1-100 elementos por página
- **Performance**: Consultas optimizadas con LIMIT/OFFSET

### Testing
- **Mocks inteligentes**: TypeORM, Express
- **Cobertura completa**: Services, Controllers, Routes
- **Tests consolidados**: Búsqueda incluida en tests principales

### Arquitectura
- **Inyección de dependencias**: DIContainer para gestión
- **Separación de responsabilidades**: Services, Controllers, Routes
- **Validación centralizada**: Joi schemas reutilizables
- **Manejo de errores**: Respuestas consistentes y informativas
- **Tests simplificados**: Estructura consolidada y mantenible