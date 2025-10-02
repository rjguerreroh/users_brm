import 'reflect-metadata';
import { Container } from 'inversify';
import { DataSource } from 'typeorm';
import { AppDataSource } from './typeorm';
import { User } from '../app/users/entities/User';
import { UserService } from '../app/users/services/UserService';
import { UserController } from '../app/users/controllers/userController';
import { UserRoutes } from '../app/users/routes/userRoutes';
import { TYPES } from './types';

/**
 * Configuración del contenedor de InversifyJS
 * Centraliza la inyección de dependencias del proyecto
 */
export const container = new Container();

/**
 * Configuración de bindings para InversifyJS
 */
export function configureContainer(): void {
  // Binding del DataSource de TypeORM
  container.bind<DataSource>(TYPES.DataSource)
    .toConstantValue(AppDataSource);

  // Binding del UserRepository
  container.bind(TYPES.UserRepository)
    .toDynamicValue(() => {
      return AppDataSource.getRepository(User);
    })
    .inSingletonScope();

  // Binding del UserService
  container.bind<UserService>(TYPES.UserService)
    .to(UserService)
    .inSingletonScope();

  // Binding del UserController
  container.bind<UserController>(TYPES.UserController)
    .to(UserController)
    .inSingletonScope();

  // Binding del UserRoutes
  container.bind<UserRoutes>(TYPES.UserRoutes)
    .to(UserRoutes)
    .inSingletonScope();
}

/**
 * Inicializa el contenedor con todas las dependencias
 */
export function initializeContainer(): Container {
  configureContainer();
  return container;
}

/**
 * Obtiene una instancia del contenedor configurado
 */
export function getContainer(): Container {
  return container;
}
