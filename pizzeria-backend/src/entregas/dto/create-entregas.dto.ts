import { IsInt, IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';

export class CreateEntregaDto {
  @IsInt()
  id_pedido: number;

  @IsInt()
  id_repartidor: number;

  @IsDateString()
  @IsOptional()
  hora_salida?: string;

  @IsDateString()
  @IsOptional()
  hora_entrega?: string;

  @IsString()
  @IsEnum(['Asignado', 'En Camino', 'Entregado', 'Fallido'])
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  comentarios?: string;
}
