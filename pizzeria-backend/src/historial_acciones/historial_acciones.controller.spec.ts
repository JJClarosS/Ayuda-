import { Test, TestingModule } from '@nestjs/testing';
import { HistorialAccionesController } from './historial_acciones.controller';
import { HistorialAccionesService } from './historial_acciones.service';

describe('HistorialAccionesController', () => {
  let controller: HistorialAccionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialAccionesController],
      providers: [HistorialAccionesService],
    }).compile();

    controller = module.get<HistorialAccionesController>(HistorialAccionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
