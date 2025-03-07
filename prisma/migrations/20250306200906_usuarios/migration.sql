/*
  Warnings:

  - You are about to drop the column `apple_id` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `google_id` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "apple_id",
DROP COLUMN "google_id";
