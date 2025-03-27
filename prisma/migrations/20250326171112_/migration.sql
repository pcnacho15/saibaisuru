/*
  Warnings:

  - You are about to drop the column `tipo_semilla` on the `productos` table. All the data in the column will be lost.
  - Added the required column `tipo_producto` to the `productos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoProducto" AS ENUM ('feminizada', 'automatica', 'regular', 'indoor', 'maceta', 'sustrato', 'insecticida');

-- DropIndex
DROP INDEX "productos_tipo_semilla_idx";

-- AlterTable
ALTER TABLE "productos" DROP COLUMN "tipo_semilla",
ADD COLUMN     "tipo_producto" "TipoProducto" NOT NULL;

-- DropEnum
DROP TYPE "Semilla";

-- CreateIndex
CREATE INDEX "productos_tipo_producto_idx" ON "productos"("tipo_producto");
