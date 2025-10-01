import { Router } from 'express';
import { DIContainer } from '../config/container';

// Obtener instancias del contenedor de dependencias
const userController = DIContainer.getUserController();

const router = Router();

// Rutas para usuarios
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;