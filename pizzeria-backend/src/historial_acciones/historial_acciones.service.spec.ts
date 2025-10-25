import { Test, TestingModule } from '@nestjs/testing';
import { HistorialAccionesService } from './historial_acciones.service';

describe('HistorialAccionesService', () => {
  let service: HistorialAccionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialAccionesService],
    }).compile();

    service = module.get<HistorialAccionesService>(HistorialAccionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
