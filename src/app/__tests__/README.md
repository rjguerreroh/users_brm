# Tests Unitarios - API de Usuarios

Este directorio contiene los tests unitarios para la API de usuarios.

## Estructura de Tests

```
__tests__/
├── users/
│   ├── UserService.simple.test.ts    # Tests para UserService
│   ├── UserController.simple.test.ts # Tests para UserController
│   └── UserRoutes.simple.test.ts     # Tests para UserRoutes
├── setup.ts                          # Configuración global de tests
├── index.test.ts                     # Archivo principal de tests
└── README.md                         # Este archivo
```

## Tests Implementados

### UserService Tests
- ✅ `getAllUsers` - Obtener todos los usuarios
- ✅ `getUserById` - Obtener usuario por ID
- ✅ `createUser` - Crear nuevo usuario
- ✅ `updateUser` - Actualizar usuario existente
- ✅ `deleteUser` - Eliminar usuario

### UserController Tests
- ✅ `getAllUsers` - Manejo de respuestas del controlador
- ✅ `getUserById` - Manejo de respuestas por ID
- ✅ `createUser` - Manejo de creación de usuarios
- ✅ `updateUser` - Manejo de actualización de usuarios
- ✅ `deleteUser` - Manejo de eliminación de usuarios

### UserRoutes Tests
- ✅ Configuración de rutas
- ✅ Integración con middleware
- ✅ Integración con controladores

## Comandos de Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage

# Ejecutar tests para CI
npm run test:ci
```

## Configuración

Los tests están configurados con:
- **Jest** como framework de testing
- **ts-jest** para soporte de TypeScript
- **Mocks** para dependencias externas
- **Setup global** para configuración de entorno

## Cobertura de Tests

Los tests cubren:
- ✅ Servicios (UserService)
- ✅ Controladores (UserController)
- ✅ Rutas (UserRoutes)
- ✅ Casos de éxito y error
- ✅ Validaciones de entrada
- ✅ Manejo de respuestas HTTP

## Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests específicos
npm test -- --testNamePattern="UserService"

# Ejecutar tests con verbose
npm test -- --verbose
```

## Notas

- Los tests usan mocks para evitar dependencias externas
- Se configuró un entorno de testing aislado
- Los tests cubren casos de éxito y error
- Se implementaron tests simplificados para evitar problemas de tipos
