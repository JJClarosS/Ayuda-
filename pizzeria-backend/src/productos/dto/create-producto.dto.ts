// src/productos/dto/create-producto.dto.ts
import { IsNotEmpty, IsOptional, IsInt, IsString, IsBoolean } from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty() @IsString() nombre: string;
  @IsOptional() @IsString() descripcion?: string;
  @IsNotEmpty() @IsInt() id_categoria: number;
  @IsOptional() @IsString() imagen_url?: string;
  @IsOptional() @IsBoolean() disponible?: boolean;
  @IsOptional() @IsBoolean() es_promocion?: boolean;
  @IsOptional() @IsBoolean() activo?: boolean;
}
