-- CreateTable
CREATE TABLE "post_imagenes" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "post_imagenes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post_imagenes" ADD CONSTRAINT "post_imagenes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "blog_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
