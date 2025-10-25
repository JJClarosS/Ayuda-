// src/app.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProductosModule } from './productos/productos.module';
import { AlmacenesModule } from './almacenes/almacenes.module';
import { InventarioModule } from './inventario/inventario.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { PermissionsGuard } from './common/guards/permissions.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './config/constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true, // Hace que JwtService esté disponible globalmente
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ClientesModule,
    ProductosModule,
    AlmacenesModule,
    InventarioModule,
    PedidosModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Asegura autenticación primero
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard, // Luego autorización
    },
  ],
})
export class AppModule {}