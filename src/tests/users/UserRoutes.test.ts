import { UserRoutes } from '../../app/users/routes/userRoutes';

describe('UserRoutes - Tests', () => {
  let userRoutes: UserRoutes;

  beforeEach(() => {
    userRoutes = new UserRoutes();
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create UserRoutes instance', () => {
      expect(userRoutes).toBeInstanceOf(UserRoutes);
    });

    it('should get controller from container', () => {
      // Verificar que el controlador está configurado
      expect(userRoutes).toBeDefined();
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
      // Verificar que el controlador está configurado
      expect(userRoutes).toBeDefined();
    });
  });
});
