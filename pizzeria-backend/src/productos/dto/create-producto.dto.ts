import { IsString, IsInt, IsBoolean, IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class ProductoTamanoDto {
  @IsInt()
  id_tamano: number;

  @IsNumber()
  precio: number; // Cambiado de objeto JSON a número

  @IsBoolean()
  disponible: boolean;

  @IsBoolean()
  @IsOptional()
  activo?: boolean; // Mantenido como opcional, usaremos un valor por defecto en el servicio
}

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsInt()
  id_categoria: number;

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoTamanoDto)
  producto_tamanos: ProductoTamanoDto[];
}