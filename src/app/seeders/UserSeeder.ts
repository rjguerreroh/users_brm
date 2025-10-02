import { DataSource } from 'typeorm';
import { User } from '../users/entities/User';

export class UserSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    console.log('🌱 Iniciando seeder de usuarios...');

    try {
      // Verificar si ya existen usuarios
      const userRepository = this.dataSource.getRepository(User);
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

  async clear(): Promise<void> {
    try {
      const userRepository = this.dataSource.getRepository(User);
      await userRepository.clear();
      console.log('Datos de usuarios eliminados');
    } catch (error) {
      console.error('Error al limpiar datos:', error);
      throw error;
    }
  }
}
