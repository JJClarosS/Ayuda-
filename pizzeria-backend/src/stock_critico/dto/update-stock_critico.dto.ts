import { PartialType } from '@nestjs/mapped-types';
import { CreateStockCriticoDto } from './create-stock_critico.dto';

export class UpdateStockCriticoDto extends PartialType(CreateStockCriticoDto) {}
