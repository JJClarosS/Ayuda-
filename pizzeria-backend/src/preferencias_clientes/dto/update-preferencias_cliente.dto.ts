// src/preferencias-clientes/dto/update-preferencias-cliente.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsString, IsNumber } from 'class-validator';

export class UpdatePreferenciasClienteDto {
  @IsInt()
  @IsOptional()
  producto_favorito?: number;

  @IsInt()
  @IsOptional()
  categoria_favorita?: number;

  @IsInt()
  @IsOptional()
  tamano_preferido?: number;

  @IsString()
  @IsOptional()
  horario_preferido?: string;

  @IsString()
  @IsOptional()
  dia_preferido?: string;

  @IsInt()
  @IsOptional()
  frecuencia_pedidos?: number;

  @IsNumber()
  @IsOptional()
  ticket_promedio?: number;
}