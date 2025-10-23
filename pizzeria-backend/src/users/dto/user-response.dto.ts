import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from '../entities/user.entity';

/**
 * DTO de respuesta para el usuario.
 * Excluye la contraseña y otros campos sensibles/internos.
 */
export class UserResponseDto {
  @Expose()
  id_usuario: number;

  @Expose()
  nombre: string;

  @Expose()
  apellido: string;

  @Expose()
  email: string;

  @Expose()
  telefono: string | null;
  
  @Expose()
  id_rol: number;
  
  @Expose()
  activo: boolean;
  
  @Expose()
  fecha_registro: Date;

  @Expose()
  ultimo_acceso: Date | null;
  
  @Expose()
  roleName: string; // Nombre del rol expuesto
  
  @Exclude() // Excluye el hash de la contraseña de la respuesta
  password_hash: string;
  
  constructor(user: UserEntity) {
      // Usamos el decorador @Exclude() en la propiedad password_hash en la clase UserEntity
      // Pero dado que Prisma devuelve un objeto plano, usamos Exclude/Expose
      Object.assign(this, user);
      this.roleName = user.roles?.nombre_rol;
  }
}
