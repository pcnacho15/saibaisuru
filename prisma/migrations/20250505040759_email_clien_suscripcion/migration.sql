-- CreateTable
CREATE TABLE "suscripcion" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "acepta_oferta" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "suscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "suscripcion_email_idx" ON "suscripcion"("email");
