// src/disponibilidad/dto/update-disponibilidad.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateDisponibilidadDto {
  @IsBoolean()
  @IsOptional()
  disponible?: boolean;

  @IsString()
  @IsOptional()
  motivo?: string;
}