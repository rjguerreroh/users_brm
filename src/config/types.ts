/**
 * Tipos para InversifyJS
 * Define los símbolos de inyección de dependencias
 */

export const TYPES = {
  // Repositories
  UserRepository: Symbol.for('UserRepository'),
  
  // Services
  UserService: Symbol.for('UserService'),
  
  // Controllers
  UserController: Symbol.for('UserController'),
  
  // Routes
  UserRoutes: Symbol.for('UserRoutes'),
  
  // Database
  DataSource: Symbol.for('DataSource'),
} as const;

export type TYPES = typeof TYPES;
