import { IsInt, IsString, IsOptional, Min, Max } from 'class-validator';

export class CreateComentarioDto {
  @IsInt()
  id_pedido: number;

  @IsInt()
  id_cliente: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  calificacion?: number;

  @IsString()
  @IsOptional()
  comentario?: string;
}