/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `suscripcion` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "suscripcion_email_idx";

-- CreateIndex
CREATE UNIQUE INDEX "suscripcion_email_key" ON "suscripcion"("email");
