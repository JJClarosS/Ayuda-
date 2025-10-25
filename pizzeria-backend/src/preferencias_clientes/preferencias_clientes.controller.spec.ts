import { Test, TestingModule } from '@nestjs/testing';
import { PreferenciasClientesController } from './preferencias_clientes.controller';
import { PreferenciasClientesService } from './preferencias_clientes.service';

describe('PreferenciasClientesController', () => {
  let controller: PreferenciasClientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreferenciasClientesController],
      providers: [PreferenciasClientesService],
    }).compile();

    controller = module.get<PreferenciasClientesController>(PreferenciasClientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
