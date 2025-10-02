import 'reflect-metadata';
import { AppDataSource } from '../config/typeorm';
import { User } from '../app/users/entities/User';

export class SeederRunner {
  constructor() {}

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
      await this.runUserSeeder();

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
      await this.clearUserSeeder();

      // Ejecutar seeders
      await this.runUserSeeder();

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
      await this.clearUserSeeder();

      console.log('='.repeat(50));
      console.log('🎉 Todos los datos eliminados');

    } catch (error) {
      console.error('Error limpiando datos:', error);
      throw error;
    }
  }

  private async runUserSeeder(): Promise<void> {
    console.log('🌱 Iniciando seeder de usuarios...');

    try {
      // Verificar si ya existen usuarios
      const userRepository = AppDataSource.getRepository(User);
      const existingUsers = await userRepository.count();
      
      if (existingUsers > 0) {
        console.log(`Ya existen ${existingUsers} usuarios en la base de datos`);
        console.log('Para limpiar y volver a sembrar, ejecuta: npm run seed:reset');
        return;
      }

      const usersData = [
        {
          name: 'Juan Pérez',
          email: 'juan.perez@example.com',
          age: 30
        },
        {
          name: 'María García',
          email: 'maria.garcia@example.com',
          age: 25
        },
        {
          name: 'Carlos López',
          email: 'carlos.lopez@example.com',
          age: 28
        },
        {
          name: 'Ana Martínez',
          email: 'ana.martinez@example.com',
          age: 32
        },
        {
          name: 'Luis Rodríguez',
          email: 'luis.rodriguez@example.com',
          age: 27
        },
        {
          name: 'Carmen Sánchez',
          email: 'carmen.sanchez@example.com',
          age: 29
        },
        {
          name: 'Pedro Fernández',
          email: 'pedro.fernandez@example.com',
          age: 35
        },
        {
          name: 'Isabel Torres',
          email: 'isabel.torres@example.com',
          age: 26
        },
        {
          name: 'Miguel Ruiz',
          email: 'miguel.ruiz@example.com',
          age: 31
        },
        {
          name: 'Laura Jiménez',
          email: 'laura.jimenez@example.com',
          age: 24
        },
        {
          name: 'Roberto Vargas',
          email: 'roberto.vargas@example.com',
          age: 33
        },
        {
          name: 'Sofia Herrera',
          email: 'sofia.herrera@example.com',
          age: 28
        },
        {
          name: 'Diego Morales',
          email: 'diego.morales@example.com',
          age: 29
        },
        {
          name: 'Valentina Castro',
          email: 'valentina.castro@example.com',
          age: 26
        },
        {
          name: 'Andrés Ramírez',
          email: 'andres.ramirez@example.com',
          age: 34
        },
        {
          name: 'Camila Flores',
          email: 'camila.flores@example.com',
          age: 25
        },
        {
          name: 'Sebastián Cruz',
          email: 'sebastian.cruz@example.com',
          age: 30
        },
        {
          name: 'Natalia Reyes',
          email: 'natalia.reyes@example.com',
          age: 27
        },
        {
          name: 'Fernando Aguilar',
          email: 'fernando.aguilar@example.com',
          age: 32
        },
        {
          name: 'Gabriela Moreno',
          email: 'gabriela.moreno@example.com',
          age: 28
        }
      ];

      // Crear usuarios
      const users = userRepository.create(usersData);
      await userRepository.save(users);

      console.log(`Seeder completado: ${users.length} usuarios creados`);
      console.log('Usuarios creados:');
      users.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.name} (${user.email}) - ${user.age} años`);
      });

    } catch (error) {
      console.error('Error en UserSeeder:', error);
      throw error;
    }
  }

  private async clearUserSeeder(): Promise<void> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      await userRepository.clear();
      console.log('Datos de usuarios eliminados');
    } catch (error) {
      console.error('Error al limpiar datos:', error);
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