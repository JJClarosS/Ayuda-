// src/pedidos/dto/create-pedido.dto.ts
import { IsInt, IsOptional, IsArray, ValidateNested, IsNumber, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class DetallePedidoItem {
  @IsInt() id_producto_tamano: number;
  @IsInt() @Min(1) cantidad: number;
  @IsOptional() @IsString() ingredientes_extra?: string;
  @IsOptional() @IsString() notas?: string;
}

export class CreatePedidoDto {
  @IsOptional() @IsInt() id_cliente?: number;
  @IsInt() id_empleado: number;
  @IsOptional() @IsInt() id_mesa?: number;
  @IsInt() id_almacen: number;
  @IsOptional() @IsString() tipo_pedido?: string;
  @IsOptional() @IsNumber() descuento?: number;
  @IsOptional() @IsString() direccion_entrega?: string;
  @IsOptional() @IsString() notas?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetallePedidoItem)
  detalle: DetallePedidoItem[];
}
