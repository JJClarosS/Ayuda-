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
import { CategoriasModule } from './categorias/categorias.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { ComprasModule } from './compras/compras.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { EntregasModule } from './entregas/entregas.module';
import { GastosModule } from './gastos/gastos.module';
import { IngredientesModule } from './ingredientes/ingredientes.module';
import { MesasModule } from './mesas/mesas.module';
import { MetodosPagoModule } from './metodos_pago/metodos_pago.module';
import { PagosModule } from './pagos/pagos.module';
import { PromocionesModule } from './promociones/promociones.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { RecetasModule } from './recetas/recetas.module';
import { RepartidoresModule } from './repartidores/repartidores.module';
import { ReservasModule } from './reservas/reservas.module';
import { RolesModule } from './roles/roles.module';
import { HistorialAccionesModule } from './historial_acciones/historial_acciones.module';
import { HistorialClientesModule } from './historial_clientes/historial_clientes.module';
import { PreferenciasClientesModule } from './preferencias_clientes/preferencias_clientes.module';
import { ReportesModule } from './reportes/reportes.module';
import { SesionesUsuarioModule } from './sesiones_usuario/sesiones_usuario.module';
import { StockCriticoModule } from './stock_critico/stock_critico.module';
import { VistasSqlModule } from './vistas_sql/vistas_sql.module';

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
    CategoriasModule,
    ComentariosModule,
    ComprasModule,
    EmpleadosModule,
    EntregasModule,
    GastosModule,
    IngredientesModule,
    MesasModule,
    MetodosPagoModule,
    PagosModule,
    PromocionesModule,
    ProveedoresModule,
    RecetasModule,
    RepartidoresModule,
    ReservasModule,
    RolesModule,
    HistorialAccionesModule,
    HistorialClientesModule,
    PreferenciasClientesModule,
    ReportesModule,
    SesionesUsuarioModule,
    StockCriticoModule,
    VistasSqlModule,
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