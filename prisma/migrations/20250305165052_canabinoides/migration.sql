-- CreateTable
CREATE TABLE "canabinoides" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "porcentaje" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "productos_id" TEXT NOT NULL,

    CONSTRAINT "canabinoides_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "canabinoides" ADD CONSTRAINT "canabinoides_productos_id_fkey" FOREIGN KEY ("productos_id") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
