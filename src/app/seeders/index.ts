import 'reflect-metadata';
import { AppDataSource } from '../../config/typeorm';
import { UserSeeder } from './UserSeeder';

export class SeederRunner {
  private userSeeder: UserSeeder;

  constructor() {
    this.userSeeder = new UserSeeder(AppDataSource);
  }

  async run(): Promise<void> {
    console.log('Iniciando seeders...');
    console.log('='.repeat(50));

    try {
      // Inicializar conexión a la base de datos
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log('Conexión a la base de datos establecida');
      }

      // Ejecutar seeders
      await this.userSeeder.run();

      console.log('='.repeat(50));
      console.log('Todos los seeders completados exitosamente');

    } catch (error) {
      console.error('Error ejecutando seeders:', error);
      throw error;
    }
  }

  async reset(): Promise<void> {
    console.log('Reiniciando seeders...');
    console.log('='.repeat(50));

    try {
      // Inicializar conexión a la base de datos
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log('Conexión a la base de datos establecida');
      }

      // Limpiar datos existentes
      await this.userSeeder.clear();

      // Ejecutar seeders
      await this.userSeeder.run();

      console.log('='.repeat(50));
      console.log('Seeders reiniciados exitosamente');

    } catch (error) {
      console.error('Error reiniciando seeders:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    console.log('Limpiando todos los datos...');
    console.log('='.repeat(50));

    try {
      // Inicializar conexión a la base de datos
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log('Conexión a la base de datos establecida');
      }

      // Limpiar datos
      await this.userSeeder.clear();

      console.log('='.repeat(50));
      console.log('🎉 Todos los datos eliminados');

    } catch (error) {
      console.error('Error limpiando datos:', error);
      throw error;
    }
  }
}

// Ejecutar seeders si se llama directamente
if (require.main === module) {
  const seederRunner = new SeederRunner();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'run':
      seederRunner.run()
        .then(() => process.exit(0))
        .catch((error) => {
          console.error(error);
          process.exit(1);
        });
      break;
    
    case 'reset':
      seederRunner.reset()
        .then(() => process.exit(0))
        .catch((error) => {
          console.error(error);
          process.exit(1);
        });
      break;
    
    case 'clear':
      seederRunner.clear()
        .then(() => process.exit(0))
        .catch((error) => {
          console.error(error);
          process.exit(1);
        });
      break;
    
    default:
      console.log('Uso: npm run seed [run|reset|clear]');
      console.log('  run   - Ejecutar seeders (solo si no hay datos)');
      console.log('  reset - Limpiar y volver a ejecutar seeders');
      console.log('  clear - Limpiar todos los datos');
      process.exit(1);
  }
}
