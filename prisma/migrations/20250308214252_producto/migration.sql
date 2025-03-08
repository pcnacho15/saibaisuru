/*
  Warnings:

  - You are about to alter the column `descuento` on the `productos` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "productos" ALTER COLUMN "descuento" DROP NOT NULL,
ALTER COLUMN "descuento" DROP DEFAULT,
ALTER COLUMN "descuento" SET DATA TYPE INTEGER;
