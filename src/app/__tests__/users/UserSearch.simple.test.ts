import { UserService } from '../../users/services/UserService';
import { UserController } from '../../users/controllers/userController';
import { SearchParams, SearchResponse } from '../../users/interfaces/User';

// Mock del repositorio de TypeORM
const mockRepository = {
  createQueryBuilder: jest.fn(() => ({
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn()
  }))
};

// Mock de usuarios de prueba
const mockUsers = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@example.com',
    age: 30,
    createdAt: new Date('2025-10-01T05:49:33.099Z'),
    updatedAt: new Date('2025-10-01T05:49:33.099Z')
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria@example.com',
    age: 25,
    createdAt: new Date('2025-10-01T05:49:33.099Z'),
    updatedAt: new Date('2025-10-01T05:49:33.099Z')
  },
  {
    id: 3,
    name: 'Carlos López',
    email: 'carlos@example.com',
    age: 28,
    createdAt: new Date('2025-10-01T05:49:33.099Z'),
    updatedAt: new Date('2025-10-01T05:49:33.099Z')
  }
];

describe('UserService - Búsqueda Avanzada', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockRepository as any);
    jest.clearAllMocks();
  });

  describe('searchUsers', () => {
    it('should validate pagination parameters', async () => {
      const searchParams: SearchParams = {
        page: 0,
        limit: 10
      };

      const result = await userService.searchUsers(searchParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('La página debe ser mayor a 0');
    });

    it('should validate limit parameters', async () => {
      const searchParams: SearchParams = {
        page: 1,
        limit: 150
      };

      const result = await userService.searchUsers(searchParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('El límite debe estar entre 1 y 100');
    });
  });
});

describe('UserController - Búsqueda Avanzada', () => {
  let userController: UserController;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(() => {
    mockUserService = {
      searchUsers: jest.fn()
    } as any;

    userController = new UserController(mockUserService);
    jest.clearAllMocks();
  });

  describe('searchUsers', () => {
    it('should handle search request successfully', async () => {
      const mockRequest = {
        query: {
          search: 'Juan',
          page: '1',
          limit: '10'
        }
      } as any;

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      } as any;

      const mockSearchResponse: SearchResponse<any> = {
        data: [mockUsers[0]],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
          hasNext: false,
          hasPrev: false
        },
        filters: {
          search: 'Juan',
          sortBy: 'createdAt',
          sortOrder: 'DESC'
        }
      };

      mockUserService.searchUsers.mockResolvedValue({
        success: true,
        data: mockSearchResponse,
        message: 'Se encontraron 1 usuarios con los filtros aplicados'
      });

      await userController.searchUsers(mockRequest, mockResponse);

      expect(mockUserService.searchUsers).toHaveBeenCalledWith({
        search: 'Juan',
        name: undefined,
        email: undefined,
        ageMin: undefined,
        ageMax: undefined,
        sortBy: undefined,
        sortOrder: undefined,
        page: 1,
        limit: 10
      });

      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockSearchResponse,
        message: 'Se encontraron 1 usuarios con los filtros aplicados'
      });
    });

    it('should handle search request with all parameters', async () => {
      const mockRequest = {
        query: {
          search: 'test',
          name: 'Juan',
          email: 'juan@example.com',
          ageMin: '25',
          ageMax: '30',
          sortBy: 'name',
          sortOrder: 'ASC',
          page: '2',
          limit: '5'
        }
      } as any;

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      } as any;

      mockUserService.searchUsers.mockResolvedValue({
        success: true,
        data: {} as SearchResponse<any>,
        message: 'Búsqueda exitosa'
      });

      await userController.searchUsers(mockRequest, mockResponse);

      expect(mockUserService.searchUsers).toHaveBeenCalledWith({
        search: 'test',
        name: 'Juan',
        email: 'juan@example.com',
        ageMin: 25,
        ageMax: 30,
        sortBy: 'name',
        sortOrder: 'ASC',
        page: 2,
        limit: 5
      });
    });

    it('should handle search errors', async () => {
      const mockRequest = {
        query: {}
      } as any;

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      } as any;

      mockUserService.searchUsers.mockResolvedValue({
        success: false,
        error: 'Error de validación'
      });

      await userController.searchUsers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: 'Error de validación'
      });
    });

    it('should handle pagination validation errors', async () => {
      const mockRequest = {
        query: {
          page: '0'
        }
      } as any;

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      } as any;

      mockUserService.searchUsers.mockResolvedValue({
        success: false,
        error: 'La página debe ser mayor a 0'
      });

      await userController.searchUsers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: 'La página debe ser mayor a 0'
      });
    });
  });
});
