-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_confirmado" BOOLEAN NOT NULL,
    "clave" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'user',
    "image" TEXT,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
