import { Injectable } from '@nestjs/common';
import { CreateStockCriticoDto } from './dto/create-stock_critico.dto';
import { UpdateStockCriticoDto } from './dto/update-stock_critico.dto';

@Injectable()
export class StockCriticoService {
  create(createStockCriticoDto: CreateStockCriticoDto) {
    return 'This action adds a new stockCritico';
  }

  findAll() {
    return `This action returns all stockCritico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockCritico`;
  }

  update(id: number, updateStockCriticoDto: UpdateStockCriticoDto) {
    return `This action updates a #${id} stockCritico`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockCritico`;
  }
}
