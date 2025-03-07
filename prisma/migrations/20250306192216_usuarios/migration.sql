-- CreateEnum
CREATE TYPE "Login" AS ENUM ('email', 'google', 'apple');

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "apple_id" TEXT,
ADD COLUMN     "fecha_actualiza" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "google_id" TEXT,
ADD COLUMN     "tipo_login" "Login" NOT NULL DEFAULT 'email';
