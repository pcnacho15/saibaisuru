/*
  Warnings:

  - You are about to drop the column `tipo_producto` on the `productos` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "productos_tipo_producto_idx";

-- AlterTable
ALTER TABLE "productos" DROP COLUMN "tipo_producto";
