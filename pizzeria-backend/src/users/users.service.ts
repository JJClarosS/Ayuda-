import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { Role } from 'src/config/constants';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Transforma el objeto Prisma 'usuarios' para incluir el nombre del rol.
   * @param usuario Objeto usuario de Prisma.
   * @returns Objeto User con el campo 'rol'.
   */
  private async mapPrismaUserToAppUser(usuario: any): Promise<User> {
    if (!usuario) return null;
    const role = await this.prisma.roles.findUnique({
      where: { id_rol: usuario.id_rol },
    });
    
    // El email se usa como el nombre de usuario
    return {
      ...usuario,
      rol: role ? (role.nombre_rol.toUpperCase() as Role) : Role.Client, // Asignar un rol por defecto si no se encuentra
    };
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.usuarios.findUnique({ where: { email } });
    return this.mapPrismaUserToAppUser(user);
  }

  async findById(id_usuario: number): Promise<User | undefined> {
    const user = await this.prisma.usuarios.findUnique({ where: { id_usuario } });
    return this.mapPrismaUserToAppUser(user);
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
    const defaultRole = await this.prisma.roles.findUnique({ where: { nombre_rol: Role.Client } });
    if (!defaultRole) {
        throw new NotFoundException('Default client role not found. Please seed roles.');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.prisma.usuarios.create({
      data: {
        nombre: registerDto.nombre,
        apellido: registerDto.apellido,
        email: registerDto.email,
        telefono: registerDto.telefono,
        password_hash: hashedPassword,
        id_rol: defaultRole.id_rol,
        activo: true,
      },
    });

    // Se asume que también se quiere crear un registro en la tabla `clientes` si el rol es 'CLIENT'
    await this.prisma.clientes.create({
      data: {
        id_usuario: newUser.id_usuario,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        email: newUser.email,
        telefono: newUser.telefono,
        activo: true,
      },
    });

    return this.mapPrismaUserToAppUser(newUser);
  }
}
