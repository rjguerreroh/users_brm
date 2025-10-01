import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { CreateUserData, UpdateUserData, UserServiceResponse, PaginationParams, PaginatedResponse } from '../interfaces';

export class UserService {
  constructor(private userRepository: Repository<User>) {}

  /**
   * Obtiene todos los usuarios con paginación
   */
  async getAllUsers(paginationParams?: PaginationParams): Promise<UserServiceResponse<PaginatedResponse<User>>> {
    try {
      // Valores por defecto para paginación
      const page = paginationParams?.page ?? 1;
      const limit = paginationParams?.limit ?? 10;
      
      // Validar parámetros de paginación
      if (page < 1) {
        return {
          success: false,
          error: 'La página debe ser mayor a 0'
        };
      }
      
      if (limit < 1 || limit > 100) {
        return {
          success: false,
          error: 'El límite debe estar entre 1 y 100'
        };
      }

      // Calcular offset
      const skip = (page - 1) * limit;

      // Obtener usuarios con paginación
      const [users, total] = await this.userRepository.findAndCount({
        order: { createdAt: 'DESC' },
        skip,
        take: limit
      });

      // Sanitizar datos de usuarios
      const sanitizedUsers = users.map(user => this.sanitizeUserData(user));

      // Calcular información de paginación
      const totalPages = Math.ceil(total / limit);
      const hasNext = page < totalPages;
      const hasPrev = page > 1;

      const paginatedResponse: PaginatedResponse<User> = {
        data: sanitizedUsers,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext,
          hasPrev
        }
      };

      return {
        success: true,
        data: paginatedResponse,
        message: `Se encontraron ${total} usuarios (página ${page} de ${totalPages})`
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



}
