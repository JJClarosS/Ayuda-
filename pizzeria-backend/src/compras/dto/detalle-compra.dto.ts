// src/compras/dto/detalle-compra.dto.ts
import { IsInt, IsPositive, IsDecimal, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class DetalleCompraDto {
  @IsInt({ message: 'El ID del ingrediente debe ser un número entero' })
  @IsPositive({ message: 'El ID del ingrediente debe ser positivo' })
  id_ingrediente: number;

  @IsDecimal(
    { decimal_digits: '2' },
    { message: 'La cantidad debe tener máximo 2 decimales' }
  )
  @Type(() => Number)
  @IsPositive({ message: 'La cantidad debe ser mayor a 0' })
  cantidad: number;

  @IsDecimal(
    { decimal_digits: '2' },
    { message: 'El precio unitario debe tener máximo 2 decimales' }
  )
  @Type(() => Number)
  @IsPositive({ message: 'El precio unitario debe ser mayor a 0' })
  precio_unitario: number;

  // Opcional: si quieres calcular subtotal en backend
  // subtotal: number;
}