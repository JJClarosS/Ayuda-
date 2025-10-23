import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Se asegura de que PrismaClient se inicialice
    super();
  }

  async onModuleInit() {
    // Conecta la instancia de Prisma al iniciar el módulo
    await this.$connect();
  }
  

}
