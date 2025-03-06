-- CreateEnum
CREATE TYPE "Semilla" AS ENUM ('feminizada', 'regular', 'automatica');

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "notas" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "aroma" TEXT NOT NULL,
    "sabor" TEXT NOT NULL,
    "contenido" INTEGER NOT NULL,
    "cosecha_aprox" TEXT NOT NULL,
    "tipo" "Semilla" NOT NULL,
    "categorias_id" TEXT NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nombre_key" ON "categorias"("nombre");

-- CreateIndex
CREATE INDEX "productos_tipo_idx" ON "productos"("tipo");

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_categorias_id_fkey" FOREIGN KEY ("categorias_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
