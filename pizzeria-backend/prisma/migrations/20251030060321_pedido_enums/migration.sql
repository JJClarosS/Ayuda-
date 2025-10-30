-- CreateEnum
CREATE TYPE "TipoPedido" AS ENUM ('Local', 'Domicilio', 'Para_Llevar');

-- CreateEnum
CREATE TYPE "EstadoPedido" AS ENUM ('Pendiente', 'En_Preparación', 'Listo', 'En_Camino', 'Entregado', 'Cancelado');
