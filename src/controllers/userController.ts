import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeorm';
import { User } from '../entities/User';

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({
      order: { createdAt: 'DESC' }
    });

    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener usuarios'
    });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({
        success: false,
        error: 'ID de usuario requerido'
      });
      return;
    }
    
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: parseInt(id) }
    });

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
      return;
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener usuario'
    });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, age } = req.body;

    // Validación básica
    if (!name || !email || !age) {
      res.status(400).json({
        success: false,
        error: 'Faltan campos requeridos: name, email, age'
      });
      return;
    }

    const userRepository = AppDataSource.getRepository(User);

    // Verificar si el email ya existe
    const existingUser = await userRepository.findOne({
      where: { email }
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        error: 'El email ya está registrado'
      });
      return;
    }

    // Crear nuevo usuario
    const newUser = userRepository.create({
      name,
      email,
      age: parseInt(age)
    });

    const savedUser = await userRepository.save(newUser);

    res.status(201).json({
      success: true,
      data: savedUser,
      message: 'Usuario creado exitosamente'
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear usuario'
    });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        error: 'ID de usuario requerido'
      });
      return;
    }

    const userRepository = AppDataSource.getRepository(User);

    // Verificar si el usuario existe
    const existingUser = await userRepository.findOne({
      where: { id: parseInt(id) }
    });

    if (!existingUser) {
      res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
      return;
    }

    // Verificar si el email ya existe en otro usuario
    if (email && email !== existingUser.email) {
      const emailCheck = await userRepository.findOne({
        where: { email }
      });

      if (emailCheck) {
        res.status(409).json({
          success: false,
          error: 'El email ya está registrado por otro usuario'
        });
        return;
      }
    }

    // Actualizar usuario
    if (name) existingUser.name = name;
    if (email) existingUser.email = email;
    if (age) existingUser.age = parseInt(age);

    const updatedUser = await userRepository.save(existingUser);

    res.json({
      success: true,
      data: updatedUser,
      message: 'Usuario actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar usuario'
    });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({
        success: false,
        error: 'ID de usuario requerido'
      });
      return;
    }
    
    const userRepository = AppDataSource.getRepository(User);

    // Verificar si el usuario existe
    const existingUser = await userRepository.findOne({
      where: { id: parseInt(id) }
    });

    if (!existingUser) {
      res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
      return;
    }

    // Eliminar usuario
    await userRepository.remove(existingUser);

    res.json({
      success: true,
      data: existingUser,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar usuario'
    });
  }
};