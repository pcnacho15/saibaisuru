/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `productos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "productos_slug_key" ON "productos"("slug");
