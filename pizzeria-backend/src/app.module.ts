import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

// Guards
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

// Middlewares
import { LoggingMiddleware } from './common/middleware/loggin.middleware';
import { AuthMiddleware } from './common/middleware/auth.middleware';

@Module({
  imports: [
    // Usamos ConfigModule para variables de entorno (aunque usamos constantes por simplicidad aquí)
    ConfigModule.forRoot({ isGlobal: true }), 
    PrismaModule,
    UsersModule, 
    AuthModule
  ],
  providers: [
    // Configuramos el JwtAuthGuard globalmente
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Configuramos el RolesGuard globalmente
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
    // Aplicamos los middlewares
    configure(consumer: MiddlewareConsumer) {
        consumer
            // Middleware de Logging aplicado a todas las rutas
            .apply(LoggingMiddleware) 
            .forRoutes({ path: '*', method: RequestMethod.ALL })
            
            // Middleware de Auth aplicado a todas las rutas excepto a las de autenticación
            .apply(AuthMiddleware) 
            .exclude(
                { path: 'auth/login', method: RequestMethod.POST },
                { path: 'auth/register', method: RequestMethod.POST },
            )
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
