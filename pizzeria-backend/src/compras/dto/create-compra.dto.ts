// create-compra.dto.ts
import { IsInt, IsNumber, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class DetalleCompraDto {
  @IsInt()
  id_ingrediente: number;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  precio_unitario: number;
}

export class CreateCompraDto {
  @IsInt()
  id_proveedor: number;

  @IsInt()
  id_empleado: number;

  @IsInt()
  id_almacen: number;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  notas?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleCompraDto)
  detalle_compras: DetalleCompraDto[];
}