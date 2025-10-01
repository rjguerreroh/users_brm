import { UserService } from '../../users/services/UserService';

// Mock simple del repositorio
const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  findAndCount: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

describe('UserService - Simple Tests', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockRepository as any);
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return paginated users successfully', async () => {
      const mockUsers = [
        {
          id: 1,
          name: 'Juan Pérez',
          email: 'juan@example.com',
          age: 30,
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-01'),
        },
      ];

      (mockRepository.findAndCount as jest.Mock).mockResolvedValue([mockUsers, 1]);

      const result = await userService.getAllUsers();

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        data: mockUsers,
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
          hasNext: false,
          hasPrev: false
        }
      });
      expect(result.message).toBe('Se encontraron 1 usuarios (página 1 de 1)');
    });

    it('should handle pagination parameters', async () => {
      const mockUsers = [
        {
          id: 1,
          name: 'Juan Pérez',
          email: 'juan@example.com',
          age: 30,
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-01'),
        },
      ];

      (mockRepository.findAndCount as jest.Mock).mockResolvedValue([mockUsers, 25]);

      const result = await userService.getAllUsers({ page: 2, limit: 5 });

      expect(result.success).toBe(true);
      expect(result.data?.pagination).toEqual({
        page: 2,
        limit: 5,
        total: 25,
        totalPages: 5,
        hasNext: true,
        hasPrev: true
      });
    });

    it('should validate pagination parameters', async () => {
      const result = await userService.getAllUsers({ page: 0 });

      expect(result.success).toBe(false);
      expect(result.error).toBe('La página debe ser mayor a 0');
    });

    it('should validate limit parameter', async () => {
      const result = await userService.getAllUsers({ limit: 150 });

      expect(result.success).toBe(false);
      expect(result.error).toBe('El límite debe estar entre 1 y 100');
    });

    it('should handle database errors', async () => {
      (mockRepository.findAndCount as jest.Mock).mockRejectedValue(new Error('Database connection failed'));

      const result = await userService.getAllUsers();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Error interno al obtener usuarios');
    });
  });

  describe('getUserById', () => {
    it('should return user by id successfully', async () => {
      const mockUser = {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@example.com',
        age: 30,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      };

      (mockRepository.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUser);
      expect(result.message).toBe('Usuario obtenido exitosamente');
    });

    it('should return error for invalid id', async () => {
      const result = await userService.getUserById(0);

      expect(result.success).toBe(false);
      expect(result.error).toBe('ID de usuario inválido');
    });

    it('should return error when user not found', async () => {
      (mockRepository.findOne as jest.Mock).mockResolvedValue(null);

      const result = await userService.getUserById(999);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Usuario no encontrado');
    });
  });

  describe('createUser', () => {
    it('should create user successfully', async () => {
      const userData = {
        name: 'Nuevo Usuario',
        email: 'nuevo@example.com',
        age: 28,
      };

      const mockUser = {
        id: 1,
        ...userData,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      };

      (mockRepository.findOne as jest.Mock).mockResolvedValue(null); // No existe usuario con ese email
      (mockRepository.create as jest.Mock).mockReturnValue(mockUser);
      (mockRepository.save as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.createUser(userData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUser);
      expect(result.message).toBe('Usuario creado exitosamente');
    });

    it('should return error when email already exists', async () => {
      const userData = {
        name: 'Nuevo Usuario',
        email: 'existente@example.com',
        age: 28,
      };

      const existingUser = {
        id: 1,
        name: 'Usuario Existente',
        email: 'existente@example.com',
        age: 30,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      };

      (mockRepository.findOne as jest.Mock).mockResolvedValue(existingUser);

      const result = await userService.createUser(userData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('El email ya está registrado');
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const userId = 1;
      const updateData = {
        name: 'Usuario Actualizado',
        age: 35,
      };

      const existingUser = {
        id: 1,
        name: 'Usuario Original',
        email: 'usuario@example.com',
        age: 30,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      };

      const updatedUser = {
        ...existingUser,
        ...updateData,
        updatedAt: new Date('2025-01-02'),
      };

      (mockRepository.findOne as jest.Mock)
        .mockResolvedValueOnce(existingUser) // Usuario existe
        .mockResolvedValueOnce(null); // Email no está en uso
      (mockRepository.save as jest.Mock).mockResolvedValue(updatedUser);

      const result = await userService.updateUser(userId, updateData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedUser);
      expect(result.message).toBe('Usuario actualizado exitosamente');
    });

    it('should return error when user not found', async () => {
      (mockRepository.findOne as jest.Mock).mockResolvedValue(null);

      const result = await userService.updateUser(999, { name: 'Test' });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Usuario no encontrado');
    });

    it('should return error for invalid id', async () => {
      const result = await userService.updateUser(0, { name: 'Test' });

      expect(result.success).toBe(false);
      expect(result.error).toBe('ID de usuario inválido');
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      const userId = 1;
      const mockUser = {
        id: 1,
        name: 'Usuario a Eliminar',
        email: 'eliminar@example.com',
        age: 30,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      };

      (mockRepository.findOne as jest.Mock).mockResolvedValue(mockUser);
      (mockRepository.remove as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.deleteUser(userId);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUser);
      expect(result.message).toBe('Usuario eliminado exitosamente');
    });

    it('should return error when user not found', async () => {
      (mockRepository.findOne as jest.Mock).mockResolvedValue(null);

      const result = await userService.deleteUser(999);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Usuario no encontrado');
    });

    it('should return error for invalid id', async () => {
      const result = await userService.deleteUser(0);

      expect(result.success).toBe(false);
      expect(result.error).toBe('ID de usuario inválido');
    });
  });
});
