import { Test, TestingModule } from '@nestjs/testing';
import { PreferenciasClientesService } from './preferencias_clientes.service';

describe('PreferenciasClientesService', () => {
  let service: PreferenciasClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreferenciasClientesService],
    }).compile();

    service = module.get<PreferenciasClientesService>(PreferenciasClientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
