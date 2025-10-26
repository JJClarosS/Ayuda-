import { PartialType } from '@nestjs/mapped-types';
import { CreatePromocionDto } from './create-promocione.dto';

export class UpdatePromocioneDto extends PartialType(CreatePromocionDto) {}
