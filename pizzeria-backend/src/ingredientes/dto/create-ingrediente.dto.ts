import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateIngredienteDto {
  @IsString()
  nombre: string;

  @IsString()
  unidad_medida: string;

  @IsNumber()
  stock_minimo: number;

  @IsNumber()
  costo_unitario: number;

  @IsString()
  proveedor: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}