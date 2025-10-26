import { IsInt, IsString, IsOptional, IsBoolean, IsDateString, IsEnum } from 'class-validator';

export class CreateReservaDto {
  @IsInt()
  id_cliente: number;

  @IsInt()
  id_mesa: number;

  @IsDateString()
  fecha_reserva: string;

  @IsString()
  // @IsTime() // Puedes usar una validación personalizada para tiempo
  hora_reserva: string;

  @IsInt()
  numero_personas: number;

  @IsString()
  @IsEnum(['Pendiente', 'Confirmada', 'Cancelada', 'Completada'])
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  notas?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
