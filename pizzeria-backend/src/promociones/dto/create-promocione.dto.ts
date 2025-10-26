import { 
  IsString, 
  IsNumber, 
  IsOptional, 
  IsBoolean, 
  IsDateString, 
  IsArray,
  IsEnum, 
  IsInt
} from 'class-validator';

export class CreatePromocionDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsEnum(['Porcentaje', 'Monto Fijo'])
  @IsOptional()
  tipo_descuento?: string;

  @IsNumber()
  valor_descuento: number;

  @IsDateString()
  fecha_inicio: string;

  @IsDateString()
  fecha_fin: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsString()
  @IsOptional()
  codigo?: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  productos_ids?: number[];
}
