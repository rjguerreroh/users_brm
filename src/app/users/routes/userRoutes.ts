import { Router } from 'express';
import { DIContainer } from '../../../config/container';
import { 
  createUserSchema, 
  updateUserSchema, 
  userIdSchema, 
  userQuerySchema
} from '../schemas/userSchemas';
import { 
  validateCreateUser, 
  validateUpdateUser, 
  validateUserId, 
  validateUserQuery
} from '../middleware/validation';

export class UserRoutes {
  private router: Router;
  private userController: any;

  constructor() {
    this.router = Router();
    this.userController = DIContainer.getUserController();
    this.setupRoutes();
  }

  private setupRoutes() {
    // Rutas para usuarios con validaciones
    // IMPORTANTE: Las rutas específicas deben ir ANTES que las rutas con parámetros
    this.router.get('/search', this.userController.searchUsers);

    this.router.get('/', 
      validateUserQuery(userQuerySchema, 'query'),
      this.userController.getAllUsers
    );

    this.router.get('/:id', 
      validateUserId(userIdSchema, 'params'),
      this.userController.getUserById
    );

    this.router.post('/', 
      validateCreateUser(createUserSchema, 'body'),
      this.userController.createUser
    );

    this.router.put('/:id', 
      validateUserId(userIdSchema, 'params'),
      validateUpdateUser(updateUserSchema, 'body'),
      this.userController.updateUser
    );

    this.router.delete('/:id', 
      validateUserId(userIdSchema, 'params'),
      this.userController.deleteUser
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
