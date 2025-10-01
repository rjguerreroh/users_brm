import { Router } from 'express';
import { DIContainer } from '../config/container';
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

// Obtener instancias del contenedor de dependencias
const userController = DIContainer.getUserController();

const router = Router();

// Rutas para usuarios con validaciones
router.get('/', 
  validateUserQuery(userQuerySchema, 'query'),
  userController.getAllUsers
);

router.get('/:id', 
  validateUserId(userIdSchema, 'params'),
  userController.getUserById
);

router.post('/', 
  validateCreateUser(createUserSchema, 'body'),
  userController.createUser
);

router.put('/:id', 
  validateUserId(userIdSchema, 'params'),
  validateUpdateUser(updateUserSchema, 'body'),
  userController.updateUser
);

router.delete('/:id', 
  validateUserId(userIdSchema, 'params'),
  userController.deleteUser
);

export default router;