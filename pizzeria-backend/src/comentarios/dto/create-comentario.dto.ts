import { IsInt, IsString, IsOptional, Min, Max } from 'class-validator';

export class CreateComentarioDto {
  @IsInt()
  id_pedido: number; // Obligatorio: ID del pedido

  @IsInt()
  @Min(1, { message: 'La calificación debe ser al menos 1' })
  @Max(5, { message: 'La calificación no puede ser mayor a 5' })
  @IsOptional()
  calificacion?: number; // Opcional: Calificación entre 1 y 5

  @IsString()
  @IsOptional()
  comentario?: string; // Opcional: Comentario
}