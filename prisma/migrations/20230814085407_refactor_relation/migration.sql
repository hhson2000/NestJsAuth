/*
  Warnings:

  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[categoryId]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_id_fkey";

-- DropForeignKey
ALTER TABLE "order detail" DROP CONSTRAINT "order detail_productId_fkey";

-- AlterTable
ALTER TABLE "order detail" ALTER COLUMN "productId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "products" DROP CONSTRAINT "products_pkey",
ALTER COLUMN "productId" DROP DEFAULT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "products_pkey" PRIMARY KEY ("productId");
DROP SEQUENCE "products_productId_seq";

-- CreateIndex
CREATE UNIQUE INDEX "products_categoryId_key" ON "products"("categoryId");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_id_fkey" FOREIGN KEY ("id") REFERENCES "products"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order detail" ADD CONSTRAINT "order detail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;
