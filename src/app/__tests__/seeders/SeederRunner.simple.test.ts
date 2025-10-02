import { SeederRunner } from '../../seeders/index';
import { AppDataSource } from '../../../config/typeorm';
import { UserSeeder } from '../../seeders/UserSeeder';

// Mock de AppDataSource
jest.mock('../../../config/typeorm', () => ({
  AppDataSource: {
    isInitialized: false,
    initialize: jest.fn().mockResolvedValue(undefined)
  }
}));

// Mock de UserSeeder
jest.mock('../../seeders/UserSeeder', () => ({
  UserSeeder: jest.fn().mockImplementation(() => ({
    run: jest.fn().mockResolvedValue(undefined),
    clear: jest.fn().mockResolvedValue(undefined)
  }))
}));

describe('SeederRunner - Simple Tests', () => {
  let seederRunner: SeederRunner;
  let mockUserSeeder: jest.Mocked<UserSeeder>;

  beforeEach(() => {
    jest.clearAllMocks();
    seederRunner = new SeederRunner();
    mockUserSeeder = (seederRunner as any).userSeeder;
  });

  describe('run', () => {
    it('should initialize database connection and run seeders', async () => {
      // Arrange
      (AppDataSource as any).isInitialized = false;

      // Act
      await seederRunner.run();

      // Assert
      expect(AppDataSource.initialize).toHaveBeenCalled();
      expect(mockUserSeeder.run).toHaveBeenCalled();
    });

    it('should not initialize database if already connected', async () => {
      // Arrange
      (AppDataSource as any).isInitialized = true;

      // Act
      await seederRunner.run();

      // Assert
      expect(AppDataSource.initialize).not.toHaveBeenCalled();
      expect(mockUserSeeder.run).toHaveBeenCalled();
    });

    it('should handle errors during seeder execution', async () => {
      // Arrange
      (AppDataSource as any).isInitialized = false;
      mockUserSeeder.run.mockRejectedValue(new Error('Seeder error'));

      // Act & Assert
      await expect(seederRunner.run()).rejects.toThrow('Seeder error');
    });
  });

  describe('reset', () => {
    it('should clear and run seeders', async () => {
      // Arrange
      (AppDataSource as any).isInitialized = false;

      // Act
      await seederRunner.reset();

      // Assert
      expect(AppDataSource.initialize).toHaveBeenCalled();
      expect(mockUserSeeder.clear).toHaveBeenCalled();
      expect(mockUserSeeder.run).toHaveBeenCalled();
    });

    it('should handle errors during reset', async () => {
      // Arrange
      (AppDataSource as any).isInitialized = false;
      mockUserSeeder.clear.mockRejectedValue(new Error('Clear error'));

      // Act & Assert
      await expect(seederRunner.reset()).rejects.toThrow('Clear error');
    });
  });

  describe('clear', () => {
    it('should clear all data', async () => {
      // Arrange
      (AppDataSource as any).isInitialized = false;

      // Act
      await seederRunner.clear();

      // Assert
      expect(AppDataSource.initialize).toHaveBeenCalled();
      expect(mockUserSeeder.clear).toHaveBeenCalled();
    });

    it('should handle errors during clear', async () => {
      // Arrange
      (AppDataSource as any).isInitialized = false;
      mockUserSeeder.clear.mockRejectedValue(new Error('Clear error'));

      // Act & Assert
      await expect(seederRunner.clear()).rejects.toThrow('Clear error');
    });
  });
});
