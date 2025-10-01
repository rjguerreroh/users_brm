import { AppDataSource } from './typeorm';
import { User } from '../app/users/entities/User';
import { UserService } from '../app/users/services/UserService';
import { UserController } from '../app/users/controllers/userController';

/**
 * Contenedor de dependencias simple
 * Centraliza la creación de instancias con inyección de dependencias
 */
export class DIContainer {
  private static userRepository = AppDataSource.getRepository(User);
  private static userService: UserService;
  private static userController: UserController;

  /**
   * Obtiene la instancia del UserService con sus dependencias inyectadas
   */
  static getUserService(): UserService {
    if (!this.userService) {
      this.userService = new UserService(this.userRepository);
    }
    return this.userService;
  }

  /**
   * Obtiene la instancia del UserController con sus dependencias inyectadas
   */
  static getUserController(): UserController {
    if (!this.userController) {
      this.userController = new UserController(this.getUserService());
    }
    return this.userController;
  }

  /**
   * Reinicia todas las instancias (útil para testing)
   */
  static reset(): void {
    this.userService = undefined as any;
    this.userController = undefined as any;
  }
}
