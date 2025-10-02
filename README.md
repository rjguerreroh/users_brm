# Users API

API REST para gestión de usuarios desarrollada con Node.js, TypeScript y PostgreSQL.

## 🚀 Características

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

## ⚡ Quick Start

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
```

## 📋 Requisitos

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

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
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

Los seeders crean 20 usuarios de prueba con datos realistas para testing y desarrollo.

### Docker
```bash
npm run docker:up      # Levantar servicios
npm run docker:down    # Detener servicios
npm run docker:logs    # Ver logs
npm run docker:restart # Reiniciar servicios
npm run docker:clean   # Limpiar volúmenes
```

## 📚 API Endpoints

### Información general
- `GET /` - Información de la API
- `GET /health` - Health check

### Usuarios
- `GET /api/users` - Listar todos los usuarios (con paginación)
- `GET /api/users/search` - Búsqueda avanzada de usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

## 📝 Ejemplos de uso

### Crear usuario
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "age": 30
  }'
```

### Obtener todos los usuarios
```bash
curl http://localhost:3000/api/users
```

### Paginación de usuarios
```bash
# Página específica
curl "http://localhost:3000/api/users?page=2"

# Límite de elementos por página
curl "http://localhost:3000/api/users?limit=5"

# Combinación de paginación
curl "http://localhost:3000/api/users?page=2&limit=5"
```

#### Parámetros de paginación:
- `page` - Número de página (por defecto: 1)
- `limit` - Elementos por página (por defecto: 10, máximo: 100)

### Obtener usuario por ID
```bash
curl http://localhost:3000/api/users/1
```

### Actualizar usuario
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Carlos Pérez",
    "email": "juancarlos@example.com",
    "age": 31
  }'
```

### Eliminar usuario
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### Búsqueda avanzada de usuarios
```bash
# Búsqueda básica
curl "http://localhost:3000/api/users/search?search=Juan"

# Búsqueda por rango de edad
curl "http://localhost:3000/api/users/search?ageMin=25&ageMax=30"

# Búsqueda con ordenamiento
curl "http://localhost:3000/api/users/search?sortBy=name&sortOrder=ASC"

# Búsqueda con paginación
curl "http://localhost:3000/api/users/search?page=2&limit=5"

# Búsqueda combinada
curl "http://localhost:3000/api/users/search?search=Juan&ageMin=25&sortBy=name&sortOrder=ASC&page=1&limit=10"
```

#### Parámetros de búsqueda disponibles:
- `search` - Búsqueda general en nombre y email
- `name` - Filtrar por nombre específico
- `email` - Filtrar por email específico
- `ageMin` - Edad mínima
- `ageMax` - Edad máxima
- `sortBy` - Campo de ordenamiento (name, email, age, createdAt, updatedAt)
- `sortOrder` - Orden (ASC, DESC)
- `page` - Número de página (por defecto: 1)
- `limit` - Elementos por página (por defecto: 10, máximo: 100)

## 📋 Estructura de respuesta

### Respuesta de paginación
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": 1,
        "name": "Juan Pérez",
        "email": "juan@example.com",
        "age": 30,
        "createdAt": "2025-10-01T05:49:33.099Z",
        "updatedAt": "2025-10-01T05:49:33.099Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "message": "Se encontraron 25 usuarios (página 1 de 3)"
}
```

### Respuesta de búsqueda avanzada
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

## 🏗️ Estructura del proyecto

```
src/
├── config/          # Configuración de base de datos y contenedor DI
├── controllers/     # Controladores de la API
├── entities/        # Entidades de TypeORM
├── interfaces/      # Interfaces y tipos TypeScript
├── middleware/      # Middleware de validación
├── models/          # Modelos de datos
├── routes/          # Definición de rutas
├── schemas/         # Esquemas de validación con Joi
├── services/        # Lógica de negocio
└── index.ts         # Punto de entrada de la aplicación
```

## 🔧 Tecnologías utilizadas

- **Node.js** - Runtime de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Express.js** - Framework web para Node.js
- **TypeORM** - ORM para TypeScript y JavaScript
- **PostgreSQL** - Base de datos relacional
- **Joi** - Validación de esquemas
- **Docker** - Containerización
- **Helmet** - Seguridad HTTP
- **CORS** - Cross-Origin Resource Sharing

## 📊 Modelo de datos

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

## 🧪 Testing

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

## 📦 Migraciones

```bash
# Generar migración
npm run migration:generate -- -n NombreMigracion

# Ejecutar migraciones
npm run migration:run

# Revertir migración
npm run migration:revert
```

## 🌱 Seeders

Los seeders permiten poblar la base de datos con datos de prueba para desarrollo y testing. Incluyen validación inteligente para evitar duplicados y manejo de errores robusto.

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

### Salida de ejemplo

```bash
🌱 Iniciando seeders...
==================================================
✅ Conexión a la base de datos establecida
🌱 Iniciando seeder de usuarios...
✅ Seeder completado: 20 usuarios creados
📊 Usuarios creados:
   1. Juan Pérez (juan.perez@example.com) - 30 años
   2. María García (maria.garcia@example.com) - 25 años
   ...
==================================================
🎉 Todos los seeders completados exitosamente
```

## ✨ Features Detalladas

### 🔍 Búsqueda Avanzada
- **Filtros múltiples**: Por nombre, email, edad, fechas
- **Búsqueda de texto**: ILIKE para búsquedas flexibles
- **Ordenamiento**: Por cualquier campo (ASC/DESC)
- **Paginación**: Control total sobre resultados
- **Validación**: Parámetros validados con Joi

### 📊 Paginación Inteligente
- **Metadatos completos**: Total, páginas, navegación
- **Límites configurables**: 1-100 elementos por página
- **Navegación**: hasNext, hasPrev para UI
- **Performance**: Consultas optimizadas con LIMIT/OFFSET

### 🧪 Testing Robusto
- **109 tests** cubriendo toda la funcionalidad
- **Mocks inteligentes**: TypeORM, Express, DIContainer
- **Cobertura completa**: Services, Controllers, Routes, Seeders
- **Tests de integración**: Endpoints reales con supertest

### 🌱 Seeders Inteligentes
- **Detección automática**: No duplica datos existentes
- **Datos realistas**: 20 usuarios con nombres españoles
- **Manejo de errores**: Logs detallados y rollback
- **Transacciones**: Operaciones atómicas garantizadas

### 🏗️ Arquitectura Limpia
- **Inyección de dependencias**: DIContainer para gestión
- **Separación de responsabilidades**: Services, Controllers, Routes
- **Validación centralizada**: Joi schemas reutilizables
- **Manejo de errores**: Respuestas consistentes y informativas

## 🚀 Despliegue

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

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

- **Tu Nombre** - *Desarrollo inicial* - [GitHub](https://github.com/tu-usuario)

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.