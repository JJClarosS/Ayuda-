import { Test, TestingModule } from '@nestjs/testing';
import { HistorialClientesController } from './historial_clientes.controller';
import { HistorialClientesService } from './historial_clientes.service';

describe('HistorialClientesController', () => {
  let controller: HistorialClientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialClientesController],
      providers: [HistorialClientesService],
    }).compile();

    controller = module.get<HistorialClientesController>(HistorialClientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
