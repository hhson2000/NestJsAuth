/*
  Warnings:

  - You are about to drop the column `lastNAme` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "lastNAme",
ADD COLUMN     "lastName" TEXT;

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "productId" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "quantinty" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("productId")
);

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_id_fkey" FOREIGN KEY ("id") REFERENCES "products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;
