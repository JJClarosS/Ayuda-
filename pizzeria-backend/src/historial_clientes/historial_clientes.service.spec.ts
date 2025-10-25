import { Test, TestingModule } from '@nestjs/testing';
import { HistorialClientesService } from './historial_clientes.service';

describe('HistorialClientesService', () => {
  let service: HistorialClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialClientesService],
    }).compile();

    service = module.get<HistorialClientesService>(HistorialClientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
