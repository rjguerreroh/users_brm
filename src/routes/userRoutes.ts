import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
/*   updateUser, */
  deleteUser
} from '../controllers/userController';

const router = Router();

// Rutas para usuarios
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
/* router.put('/:id', updateUser); */
router.delete('/:id', deleteUser);

export default router;
