// src/clientes/dto/create-cliente.dto.ts
import { IsNotEmpty, IsOptional, IsEmail, IsInt, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsOptional()
  @IsInt()
  id_usuario?: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  @IsOptional()
  @IsString()
  codigo_postal?: string;
}
