/*
  Warnings:

  - You are about to drop the column `quantinty` on the `order detail` table. All the data in the column will be lost.
  - You are about to drop the column `unitPice` on the `order detail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId,productId]` on the table `order detail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quantity` to the `order detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `order detail` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "order detail_productId_key";

-- AlterTable
ALTER TABLE "order detail" DROP COLUMN "quantinty",
DROP COLUMN "unitPice",
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "order detail_orderId_productId_key" ON "order detail"("orderId", "productId");
