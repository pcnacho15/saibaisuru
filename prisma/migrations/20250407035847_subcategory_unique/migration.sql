/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `sub_cagegorias` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sub_cagegorias_nombre_key" ON "sub_cagegorias"("nombre");
