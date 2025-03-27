/*
  Warnings:

  - Added the required column `sub_categorias_id` to the `productos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "productos" ADD COLUMN     "sub_categorias_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "sub_cagegorias" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoras_id" TEXT NOT NULL,

    CONSTRAINT "sub_cagegorias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sub_cagegorias" ADD CONSTRAINT "sub_cagegorias_categoras_id_fkey" FOREIGN KEY ("categoras_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_sub_categorias_id_fkey" FOREIGN KEY ("sub_categorias_id") REFERENCES "sub_cagegorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
