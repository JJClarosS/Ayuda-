import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

/**
 * DTO para la actualización parcial de un usuario.
 * Nota: El cambio de contraseña debe ser manejado por un endpoint separado.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  password?: string; // Permitido solo para el servicio, pero idealmente se usa ChangePasswordDto
}
