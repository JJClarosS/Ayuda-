import { IsString, IsEmail, MinLength, IsOptional, IsNumber, IsBoolean } from 'class-validator';

/**
 * DTO para la creación de un nuevo usuario (solo para ADMIN).
 */
export class CreateUserDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsString()
  @MinLength(3)
  apellido: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNumber()
  id_rol: number;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
