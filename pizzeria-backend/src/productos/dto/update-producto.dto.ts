// update-producto.dto.ts
import { IsOptional, IsBoolean, IsInt, IsString } from 'class-validator';

export class UpdateProductoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsInt()
  id_categoria?: number;

  @IsOptional()
  @IsString()
  imagen_url?: string | null;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;

  @IsOptional()
  @IsBoolean()
  es_promocion?: boolean;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}