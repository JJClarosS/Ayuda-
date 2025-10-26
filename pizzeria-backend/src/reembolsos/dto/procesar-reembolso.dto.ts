// src/reembolsos/dto/procesar-reembolso.dto.ts
import { IsInt, IsNumber, IsString, IsOptional } from 'class-validator';

export class ProcesarReembolsoDto {
  @IsInt()
  id_pago: number;

  @IsNumber()
  monto_reembolso: number;

  @IsString()
  @IsOptional()
  motivo?: string;

  @IsString()
  @IsOptional()
  metodo_reembolso?: string;
}