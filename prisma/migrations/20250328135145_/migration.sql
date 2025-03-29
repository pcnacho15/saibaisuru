/*
  Warnings:

  - You are about to drop the column `categoras_id` on the `sub_cagegorias` table. All the data in the column will be lost.
  - Added the required column `categorias_id` to the `sub_cagegorias` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sub_cagegorias" DROP CONSTRAINT "sub_cagegorias_categoras_id_fkey";

-- AlterTable
ALTER TABLE "sub_cagegorias" DROP COLUMN "categoras_id",
ADD COLUMN     "categorias_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sub_cagegorias" ADD CONSTRAINT "sub_cagegorias_categorias_id_fkey" FOREIGN KEY ("categorias_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
