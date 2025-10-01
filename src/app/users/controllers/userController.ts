import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    // Extraer parámetros de paginación de la query
    const page = req.query['page'] ? parseInt(req.query['page'] as string) : undefined;
    const limit = req.query['limit'] ? parseInt(req.query['limit'] as string) : undefined;
    
    const paginationParams = { page, limit };
    const result = await this.userService.getAllUsers(paginationParams);
    
    if (result.success) {
      res.json({
        success: true,
        data: result.data,
        message: result.message
      });
    } else {
      const statusCode = result.error?.includes('página') || result.error?.includes('límite') ? 400 : 500;
      res.status(statusCode).json({
        success: false,
        error: result.error
      });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = parseInt(id!);

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
    const userId = parseInt(id!);

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
    const userId = parseInt(id!);

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
