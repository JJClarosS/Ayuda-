import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateInventarioDto {
  @IsInt()
  @IsOptional()
  id_almacen?: number;

  @IsInt()
  @IsOptional()
  id_ingrediente?: number;

  @IsNumber()
  @IsOptional()
  stock_actual?: number;
}