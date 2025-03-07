/*
  Warnings:

  - The `tipo_login` column on the `usuarios` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "tipo_login",
ADD COLUMN     "tipo_login" TEXT NOT NULL DEFAULT 'credentials';

-- DropEnum
DROP TYPE "Login";
