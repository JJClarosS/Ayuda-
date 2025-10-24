// src/users/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() nombre: string;
  @IsOptional() apellido: string;
  @IsEmail() email: string;
  @IsOptional() telefono?: string;
  @IsNotEmpty() @MinLength(6) password: string;
  @IsOptional() id_rol?: number;
}
