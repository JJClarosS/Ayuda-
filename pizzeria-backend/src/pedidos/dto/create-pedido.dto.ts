// src/pedidos/dto/create-pedido.dto.ts
import { IsInt, IsOptional, IsArray, ValidateNested, IsNumber, Min, IsString, IsEnum, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export enum TipoPedido {
  LOCAL = 'Local',
  DOMICILIO = 'Domicilio',
  PARA_LLEVAR = 'Para Llevar',
}

class DetallePedidoItem {
  @IsInt()
  id_producto_tamano!: number;  // ¡OBLIGATORIO → usa !

  @IsInt()
  @Min(1)
  cantidad!: number;            // ¡OBLIGATORIO → usa !

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
  id_empleado!: number;         // ¡OBLIGATORIO → usa !

  @IsOptional()
  @IsInt()
  id_mesa?: number;

  @IsInt()
  id_almacen!: number;          // ¡OBLIGATORIO → usa !

  // ¡OBLIGATORIO en Prisma! Quita @IsOptional()
  @IsEnum(TipoPedido, {
    message: 'tipo_pedido debe ser: Local, Domicilio o Para Llevar'
  })
  tipo_pedido!: TipoPedido;     // ¡OBLIGATORIO → usa !

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
  detalle!: DetallePedidoItem[]; // ¡OBLIGATORIO → usa !
}