/*
  Warnings:

  - You are about to drop the column `tipo` on the `productos` table. All the data in the column will be lost.
  - Added the required column `tipo_semilla` to the `productos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "productos_tipo_idx";

-- AlterTable
ALTER TABLE "productos" DROP COLUMN "tipo",
ADD COLUMN     "tipo_semilla" "Semilla" NOT NULL;

-- CreateIndex
CREATE INDEX "productos_tipo_semilla_idx" ON "productos"("tipo_semilla");
