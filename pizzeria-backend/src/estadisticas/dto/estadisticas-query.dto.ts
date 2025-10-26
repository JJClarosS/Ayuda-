// src/estadisticas/dto/estadisticas-query.dto.ts
import { IsOptional, IsDateString, IsEnum } from 'class-validator';

export class EstadisticasQueryDto {
  @IsDateString()
  @IsOptional()
  fechaInicio?: string;

  @IsDateString()
  @IsOptional()
  fechaFin?: string;

  @IsOptional()
  @IsEnum(['dia', 'semana', 'mes', 'año'])
  agrupacion?: string;
}