import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para todas las rutas
  app.setGlobalPrefix('api/v1'); 

  // Pipe Global de Validación (validation.pipe.ts)
  // Usamos el ValidationPipe incorporado de NestJS para validar DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades que no están definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si se envían propiedades extra
      transform: true, // Transforma payloads a la instancia del DTO
      transformOptions: {
        enableImplicitConversion: true, // Habilita la conversión de tipos básicos
      },
    }),
  );

  // Habilita CORS
  app.enableCors();

  // Habilita el hook de cierre de Prisma
  const prismaService = app.get(PrismaService);


  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
