// src/almacenes/dto/create-almacen.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAlmacenDto {
  @IsNotEmpty() @IsString() nombre: string;
  @IsNotEmpty() @IsString() direccion: string;
  @IsNotEmpty() @IsString() ciudad: string;
  @IsOptional() @IsString() telefono?: string;
  @IsOptional() @IsString() responsable?: string;
  @IsNotEmpty() @IsString() tipo: string;
  @IsOptional() activo?: boolean;
}
