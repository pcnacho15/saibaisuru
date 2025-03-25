/*
  Warnings:

  - You are about to drop the column `fecha_creacion` on the `usuarios` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EstadoOrder" AS ENUM ('pendiente', 'pagada', 'rechazada');

-- CreateEnum
CREATE TYPE "EstadoEnvio" AS ENUM ('entregado', 'enviado', 'enviando');

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "fecha_creacion",
ADD COLUMN     "direccion" TEXT,
ADD COLUMN     "direccion2" TEXT,
ADD COLUMN     "fecha_crea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "municipiosId" INTEGER,
ADD COLUMN     "pais" TEXT NOT NULL DEFAULT 'Colombia';

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "sub_total" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION DEFAULT 0,
    "estado_order" "EstadoOrder" NOT NULL DEFAULT 'pendiente',
    "estado_envio" "EstadoEnvio" NOT NULL DEFAULT 'enviando',
    "costo_envio" DOUBLE PRECISION DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL,
    "items_in_order" INTEGER NOT NULL,
    "fecha_pago" TEXT,
    "fecha_crea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualiza" TIMESTAMP(3) NOT NULL,
    "usuario_id" TEXT,
    "transaction_id" TEXT,
    "ref_epayco" TEXT,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_detalle" (
    "id" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "order_id" TEXT NOT NULL,
    "producto_id" TEXT NOT NULL,

    CONSTRAINT "order_detalle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_adress" (
    "id" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "direccion2" TEXT,
    "telefono" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "order_adress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departamentos" (
    "id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "departamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "municipios" (
    "id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "departamento_id" INTEGER NOT NULL,

    CONSTRAINT "municipios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_adress_order_id_key" ON "order_adress"("order_id");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_municipiosId_fkey" FOREIGN KEY ("municipiosId") REFERENCES "municipios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detalle" ADD CONSTRAINT "order_detalle_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detalle" ADD CONSTRAINT "order_detalle_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_adress" ADD CONSTRAINT "order_adress_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "municipios" ADD CONSTRAINT "municipios_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
