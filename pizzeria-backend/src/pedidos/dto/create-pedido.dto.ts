// src/pedidos/dto/create-pedido.dto.ts
import {
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  Min,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TipoPedido } from '../enums/pedido.enum';

class DetallePedidoItem {
  @IsInt({ message: 'id_producto_tamano debe ser un número entero' })
  id_producto_tamano!: number;

  @IsInt({ message: 'cantidad debe ser un número entero' })
  @Min(1, { message: 'cantidad debe ser mayor o igual a 1' })
  cantidad!: number;

  @IsOptional()
  @IsString()
  ingredientes_extra?: string;

  @IsOptional()
  @IsString()
  notas?: string;
}

export class CreatePedidoDto {
  @IsOptional()
  @IsInt()
  id_cliente?: number;

  @IsInt()
  id_empleado!: number;

  @IsOptional()
  @IsInt()
  id_mesa?: number;

  @IsInt()
  id_almacen!: number;

  @IsEnum(TipoPedido, {
    message: 'tipo_pedido debe ser: Local, Domicilio o Para Llevar',
  })
  tipo_pedido!: TipoPedido;

  @IsOptional()
  @IsNumber()
  descuento?: number;

  @IsOptional()
  @IsString()
  direccion_entrega?: string;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Debe incluir al menos un producto' })
  @ValidateNested({ each: true })
  @Type(() => DetallePedidoItem)
  detalle!: DetallePedidoItem[];
}