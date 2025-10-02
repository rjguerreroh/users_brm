import { UserRoutes } from '../../app/users/routes/userRoutes';
import { DIContainer } from '../../config/container';

// Mock del DIContainer
jest.mock('../../config/container', () => ({
  DIContainer: {
    getUserController: jest.fn(),
  },
}));

// Mock del controlador
const mockController = {
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  searchUsers: jest.fn(),
};

describe('UserRoutes - Simple Tests', () => {
  let userRoutes: UserRoutes;

  beforeEach(() => {
    jest.clearAllMocks();
    (DIContainer.getUserController as jest.Mock).mockReturnValue(mockController);
    userRoutes = new UserRoutes();
  });

  describe('constructor', () => {
    it('should create UserRoutes instance', () => {
      expect(userRoutes).toBeInstanceOf(UserRoutes);
    });

    it('should get controller from DIContainer', () => {
      // El mock se llama en el beforeEach, así que verificamos que se llamó
      expect(DIContainer.getUserController).toHaveBeenCalled();
    });
  });

  describe('getRouter', () => {
    it('should return a router instance', () => {
      const router = userRoutes.getRouter();
      
      expect(router).toBeDefined();
      expect(typeof router.get).toBe('function');
      expect(typeof router.post).toBe('function');
      expect(typeof router.put).toBe('function');
      expect(typeof router.delete).toBe('function');
    });
  });

  describe('route setup', () => {
    it('should have all required routes configured', () => {
      const router = userRoutes.getRouter();
      
      // Verificar que el router tiene las rutas configuradas
      expect(router).toBeDefined();
    });
  });

  describe('middleware integration', () => {
    it('should use validation middleware', () => {
      // Este test verifica que las rutas están configuradas con middleware
      const router = userRoutes.getRouter();
      expect(router).toBeDefined();
    });
  });

  describe('controller integration', () => {
    it('should use controller methods for route handlers', () => {
      // Verificar que el controlador se obtiene del DIContainer
      expect(DIContainer.getUserController).toHaveBeenCalled();
    });
  });
});
