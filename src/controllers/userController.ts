import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    const result = await this.userService.getAllUsers();
    
    if (result.success) {
      res.json({
        success: true,
        data: result.data,
        count: result.data?.length || 0,
        message: result.message
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({
        success: false,
        error: 'ID de usuario requerido'
      });
      return;
    }

    const userId = parseInt(id);
    if (isNaN(userId)) {
      res.status(400).json({
        success: false,
        error: 'ID de usuario inválido'
      });
      return;
    }

    const result = await this.userService.getUserById(userId);
    
    if (result.success) {
      res.json({
        success: true,
        data: result.data,
        message: result.message
      });
    } else {
      const statusCode = result.error === 'Usuario no encontrado' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: result.error
      });
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, age } = req.body;

    // Validación básica de campos requeridos
    if (!name || !email || !age) {
      res.status(400).json({
        success: false,
        error: 'Faltan campos requeridos: name, email, age'
      });
      return;
    }

    const result = await this.userService.createUser({ name, email, age });
    
    if (result.success) {
      res.status(201).json({
        success: true,
        data: result.data,
        message: result.message
      });
    } else {
      const statusCode = result.error?.includes('email') ? 409 : 400;
      res.status(statusCode).json({
        success: false,
        error: result.error
      });
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        error: 'ID de usuario requerido'
      });
      return;
    }

    const userId = parseInt(id);
    if (isNaN(userId)) {
      res.status(400).json({
        success: false,
        error: 'ID de usuario inválido'
      });
      return;
    }

    const result = await this.userService.updateUser(userId, { name, email, age });
    
    if (result.success) {
      res.json({
        success: true,
        data: result.data,
        message: result.message
      });
    } else {
      let statusCode = 500;
      if (result.error === 'Usuario no encontrado') statusCode = 404;
      if (result.error?.includes('email')) statusCode = 409;
      if (result.error?.includes('campos')) statusCode = 400;
      
      res.status(statusCode).json({
        success: false,
        error: result.error
      });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({
        success: false,
        error: 'ID de usuario requerido'
      });
      return;
    }

    const userId = parseInt(id);
    if (isNaN(userId)) {
      res.status(400).json({
        success: false,
        error: 'ID de usuario inválido'
      });
      return;
    }

    const result = await this.userService.deleteUser(userId);
    
    if (result.success) {
      res.json({
        success: true,
        data: result.data,
        message: result.message
      });
    } else {
      const statusCode = result.error === 'Usuario no encontrado' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: result.error
      });
    }
  };
}
