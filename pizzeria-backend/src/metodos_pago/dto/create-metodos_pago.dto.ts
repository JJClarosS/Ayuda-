import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateMetodoPagoDto {
  @IsString()
  nombre: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}