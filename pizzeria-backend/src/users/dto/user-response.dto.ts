import { Exclude, Expose } from 'class-transformer';
import { usuarios as UserModel } from 'generated/prisma';
import { Role } from '../../config/constants';

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
  
  cconstructor(user: UserModel & { roles?: { nombre_rol: string } | null }) {
    Object.assign(this, user);
    this.roleName = user.roles?.nombre_rol ?? 'Desconocido';
  }
}
