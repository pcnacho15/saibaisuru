-- CreateTable
CREATE TABLE "producto_imagenes" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "productos_id" TEXT NOT NULL,

    CONSTRAINT "producto_imagenes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "producto_imagenes" ADD CONSTRAINT "producto_imagenes_productos_id_fkey" FOREIGN KEY ("productos_id") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
