// src/reembolsos/reembolsos.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProcesarReembolsoDto } from './dto/procesar-reembolso.dto';

@Injectable()
export class ReembolsosService {
  constructor(private prisma: PrismaService) {}

  async procesarReembolso(procesarReembolsoDto: ProcesarReembolsoDto) {
    const { id_pago, monto_reembolso, motivo, metodo_reembolso } = procesarReembolsoDto;

    // Verificar que el pago existe
    const pago = await this.prisma.pagos.findUnique({
      where: { id_pago },
      include: {
        pedidos: true,
      },
    });

    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id_pago} no encontrado`);
    }

    // Verificar que el pago está completado
    if (pago.estado !== 'Completado') {
      throw new BadRequestException('Solo se pueden reembolsar pagos completados');
    }

    // Verificar que el monto no excede el monto original
    const montoPago = Number(pago.monto);

if (monto_reembolso > montoPago) {
      throw new BadRequestException('El monto del reembolso no puede exceder el monto original del pago');
    }

    // Iniciar transacción
    return this.prisma.$transaction(async (prisma) => {
      // Actualizar estado del pago a Reembolsado
      const pagoActualizado = await prisma.pagos.update({
        where: { id_pago },
        data: { estado: 'Reembolsado' },
      });

      // Registrar el reembolso (podrías crear una tabla específica para reembolsos)
      // Por ahora, usamos historial_acciones
      await prisma.historial_acciones.create({
        data: {
          id_usuario: pago.pedidos.id_empleado, // O el usuario que procesa el reembolso
          tabla_afectada: 'pagos',
          id_registro: id_pago,
          accion: 'UPDATE',
          datos_anteriores: JSON.stringify(pago),
          datos_nuevos: JSON.stringify(pagoActualizado),
          descripcion: `Reembolso procesado: ${motivo || 'Sin motivo especificado'}. Monto: ${monto_reembolso}, Método: ${metodo_reembolso || 'No especificado'}`,
        },
      });

      // Si el cliente tiene puntos de fidelidad, descontar los puntos ganados con este pago
      if (pago.pedidos.id_cliente) {
        const puntosADescontar = Math.floor(monto_reembolso / 10); // 1 punto por cada Bs. 10
        if (puntosADescontar > 0) {
          await prisma.clientes.update({
            where: { id_cliente: pago.pedidos.id_cliente },
            data: {
              puntos_fidelidad: {
                decrement: puntosADescontar,
              },
            },
          });
        }
      }

      return {
        message: 'Reembolso procesado exitosamente',
        pago: pagoActualizado,
        monto_reembolso,
        metodo_reembolso,
      };
    });
  }

  async getReembolsos() {
    // Obtener pagos reembolsados
    return this.prisma.pagos.findMany({
      where: { estado: 'Reembolsado' },
      include: {
        pedidos: {
          include: {
            clientes: true,
          },
        },
        metodos_pago: true,
      },
      orderBy: {
        fecha_pago: 'desc',
      },
    });
  }

  async getReembolsoById(id: number) {
    const pago = await this.prisma.pagos.findUnique({
      where: { id_pago: id },
      include: {
        pedidos: {
          include: {
            clientes: true,
          },
        },
        metodos_pago: true,
      },
    });

    if (!pago || pago.estado !== 'Reembolsado') {
      throw new NotFoundException(`Reembolso con ID ${id} no encontrado`);
    }

    return pago;
  }
}