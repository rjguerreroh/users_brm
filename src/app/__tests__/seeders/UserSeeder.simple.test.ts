import { UserSeeder } from '../../seeders/UserSeeder';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../users/entities/User';

// Mock de DataSource
const mockDataSource = {
  getRepository: jest.fn(),
  isInitialized: true
} as unknown as DataSource;

// Mock de Repository
const mockRepository = {
  count: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  clear: jest.fn()
} as unknown as Repository<User>;

describe('UserSeeder - Simple Tests', () => {
  let userSeeder: UserSeeder;

  beforeEach(() => {
    jest.clearAllMocks();
    userSeeder = new UserSeeder(mockDataSource);
    (mockDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);
  });

  describe('run', () => {
    it('should create users when database is empty', async () => {
      // Arrange
      (mockRepository.count as jest.Mock).mockResolvedValue(0);
      (mockRepository.create as jest.Mock).mockImplementation((data) => data);
      (mockRepository.save as jest.Mock).mockResolvedValue([
        { id: 1, name: 'Test User', email: 'test@example.com', age: 25 }
      ]);

      // Act
      await userSeeder.run();

      // Assert
      expect(mockRepository.count).toHaveBeenCalled();
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should not create users when database already has data', async () => {
      // Arrange
      (mockRepository.count as jest.Mock).mockResolvedValue(5);

      // Act
      await userSeeder.run();

      // Assert
      expect(mockRepository.count).toHaveBeenCalled();
      expect(mockRepository.create).not.toHaveBeenCalled();
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it('should handle errors during user creation', async () => {
      // Arrange
      (mockRepository.count as jest.Mock).mockResolvedValue(0);
      (mockRepository.create as jest.Mock).mockImplementation(() => {
        throw new Error('Database error');
      });

      // Act & Assert
      await expect(userSeeder.run()).rejects.toThrow('Database error');
    });
  });

  describe('clear', () => {
    it('should clear all users from database', async () => {
      // Arrange
      (mockRepository.clear as jest.Mock).mockResolvedValue(undefined);

      // Act
      await userSeeder.clear();

      // Assert
      expect(mockRepository.clear).toHaveBeenCalled();
    });

    it('should handle errors during clear operation', async () => {
      // Arrange
      (mockRepository.clear as jest.Mock).mockRejectedValue(new Error('Clear error'));

      // Act & Assert
      await expect(userSeeder.clear()).rejects.toThrow('Clear error');
    });
  });

  describe('data validation', () => {
    it('should create users with valid data structure', async () => {
      // Arrange
      (mockRepository.count as jest.Mock).mockResolvedValue(0);
      (mockRepository.create as jest.Mock).mockImplementation((data) => data);
      (mockRepository.save as jest.Mock).mockResolvedValue([]);

      // Act
      await userSeeder.run();

      // Assert
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            email: expect.any(String),
            age: expect.any(Number)
          })
        ])
      );
    });

    it('should create multiple users', async () => {
      // Arrange
      (mockRepository.count as jest.Mock).mockResolvedValue(0);
      (mockRepository.create as jest.Mock).mockImplementation((data) => data);
      (mockRepository.save as jest.Mock).mockResolvedValue([]);

      // Act
      await userSeeder.run();

      // Assert
      const createCall = (mockRepository.create as jest.Mock).mock.calls[0][0];
      expect(createCall).toHaveLength(20); // 20 usuarios de prueba
    });
  });
});
