import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { CreateUserData, UpdateUserData, UserServiceResponse } from '../interfaces';

export class UserService {
  constructor(private userRepository: Repository<User>) {}

  /**
   * Obtiene todos los usuarios con lógica de negocio
   */
  async getAllUsers(): Promise<UserServiceResponse<User[]>> {
    try {
      const users = await this.userRepository.find({
        order: { createdAt: 'DESC' }
      });

      const sanitizedUsers = users.map(user => this.sanitizeUserData(user));

      return {
        success: true,
        data: sanitizedUsers,
        message: `Se encontraron ${sanitizedUsers.length} usuarios`
      };
    } catch (error) {
      console.error('Error en UserService.getAllUsers:', error);
      return {
        success: false,
        error: 'Error interno al obtener usuarios'
      };
    }
  }

  /**
   * Obtiene un usuario por ID con validaciones de negocio
   */
  async getUserById(id: number): Promise<UserServiceResponse<User>> {
    try {
      // Lógica de negocio: Validar ID
      if (!id || id <= 0) {
        return {
          success: false,
          error: 'ID de usuario inválido'
        };
      }

      const user = await this.userRepository.findOne({
        where: { id }
      });

      if (!user) {
        return {
          success: false,
          error: 'Usuario no encontrado'
        };
      }

      const sanitizedUser = this.sanitizeUserData(user);

      return {
        success: true,
        data: sanitizedUser,
        message: 'Usuario obtenido exitosamente'
      };
    } catch (error) {
      console.error('Error en UserService.getUserById:', error);
      return {
        success: false,
        error: 'Error interno al obtener usuario'
      };
    }
  }

  /**
   * Crea un nuevo usuario con lógica de negocio
   */
  async createUser(userData: CreateUserData): Promise<UserServiceResponse<User>> {
    try {
      // Lógica de negocio: Validaciones
      const validation = this.validateUserData(userData);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error || 'Datos de usuario inválidos'
        };
      }

      // Lógica de negocio: Verificar email único
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email }
      });

      if (existingUser) {
        return {
          success: false,
          error: 'El email ya está registrado'
        };
      }

      // Lógica de negocio: Aplicar reglas de negocio
      const processedData = this.processUserData(userData);

      // Crear usuario
      const newUser = this.userRepository.create(processedData);
      const savedUser = await this.userRepository.save(newUser);

      // Lógica de negocio: Aplicar reglas de privacidad
      const sanitizedUser = this.sanitizeUserData(savedUser);

      return {
        success: true,
        data: sanitizedUser,
        message: 'Usuario creado exitosamente'
      };
    } catch (error) {
      console.error('Error en UserService.createUser:', error);
      return {
        success: false,
        error: 'Error interno al crear usuario'
      };
    }
  }

  /**
   * Actualiza un usuario con lógica de negocio
   */
  async updateUser(id: number, updateData: UpdateUserData): Promise<UserServiceResponse<User>> {
    try {
      // Lógica de negocio: Validar ID
      if (!id || id <= 0) {
        return {
          success: false,
          error: 'ID de usuario inválido'
        };
      }

      // Lógica de negocio: Verificar que hay datos para actualizar
      if (Object.keys(updateData).length === 0) {
        return {
          success: false,
          error: 'No hay campos para actualizar'
        };
      }

      // Buscar usuario existente
      const existingUser = await this.userRepository.findOne({
        where: { id }
      });

      if (!existingUser) {
        return {
          success: false,
          error: 'Usuario no encontrado'
        };
      }

      // Lógica de negocio: Validar email único si se está cambiando
      if (updateData.email && updateData.email !== existingUser.email) {
        const emailCheck = await this.userRepository.findOne({
          where: { email: updateData.email }
        });

        if (emailCheck) {
          return {
            success: false,
            error: 'El email ya está registrado por otro usuario'
          };
        }
      }

      // Lógica de negocio: Aplicar reglas de negocio a los datos
      const processedData = this.processUpdateData(updateData);

      // Actualizar usuario
      Object.assign(existingUser, processedData);
      const updatedUser = await this.userRepository.save(existingUser);

      // Lógica de negocio: Aplicar reglas de privacidad
      const sanitizedUser = this.sanitizeUserData(updatedUser);

      return {
        success: true,
        data: sanitizedUser,
        message: 'Usuario actualizado exitosamente'
      };
    } catch (error) {
      console.error('Error en UserService.updateUser:', error);
      return {
        success: false,
        error: 'Error interno al actualizar usuario'
      };
    }
  }

  /**
   * Elimina un usuario con lógica de negocio
   */
  async deleteUser(id: number): Promise<UserServiceResponse<User>> {
    try {
      // Lógica de negocio: Validar ID
      if (!id || id <= 0) {
        return {
          success: false,
          error: 'ID de usuario inválido'
        };
      }

      // Buscar usuario existente
      const existingUser = await this.userRepository.findOne({
        where: { id }
      });

      if (!existingUser) {
        return {
          success: false,
          error: 'Usuario no encontrado'
        };
      }

      // Lógica de negocio: Verificar si el usuario puede ser eliminado
     

      // Eliminar usuario
      await this.userRepository.remove(existingUser);

      // Lógica de negocio: Aplicar reglas de privacidad
      const sanitizedUser = this.sanitizeUserData(existingUser);

      return {
        success: true,
        data: sanitizedUser,
        message: 'Usuario eliminado exitosamente'
      };
    } catch (error) {
      console.error('Error en UserService.deleteUser:', error);
      return {
        success: false,
        error: 'Error interno al eliminar usuario'
      };
    }
  }

  /**
   * Lógica de negocio: Validar datos del usuario
   */
  private validateUserData(userData: CreateUserData): { isValid: boolean; error?: string } {
    if (!userData.name || userData.name.trim().length < 2) {
      return { isValid: false, error: 'El nombre debe tener al menos 2 caracteres' };
    }

    if (!userData.email || !this.isValidEmail(userData.email)) {
      return { isValid: false, error: 'Formato de email inválido' };
    }

    if (!userData.age || userData.age < 1 || userData.age > 120) {
      return { isValid: false, error: 'La edad debe estar entre 1 y 120 años' };
    }

    return { isValid: true };
  }

  /**
   * Lógica de negocio: Procesar datos del usuario
   */
  private processUserData(userData: CreateUserData): CreateUserData {
    return {
      name: userData.name.trim(),
      email: userData.email.toLowerCase().trim(),
      age: userData.age
    };
  }

  /**
   * Lógica de negocio: Procesar datos de actualización
   */
  private processUpdateData(updateData: UpdateUserData): UpdateUserData {
    const processed: UpdateUserData = {};

    if (updateData.name) {
      processed.name = updateData.name.trim();
    }

    if (updateData.email) {
      processed.email = updateData.email.toLowerCase().trim();
    }

    if (updateData.age) {
      processed.age = updateData.age;
    }

    return processed;
  }

  /**
   * Lógica de negocio: Sanitizar datos del usuario (reglas de privacidad)
   */
  private sanitizeUserData(user: User): User {
    // En el futuro aquí podrías aplicar reglas de privacidad
    // como ocultar ciertos campos según el rol del usuario
    return { ...user };
  }



  /**
   * Lógica de negocio: Validar formato de email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
