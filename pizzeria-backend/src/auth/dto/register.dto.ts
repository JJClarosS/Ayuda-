// src/auth/dto/register.dto.ts
import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  apellido: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  telefono?: string;

  @IsOptional()
  id_rol?: number; // opcional: rol (si admin registra usuarios)
}
  