/*
  Warnings:

  - You are about to drop the `bookmarks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "bookmarks";

-- CreateTable
CREATE TABLE "employees" (
    "employeeId" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dob" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "reportTo" INTEGER,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("employeeId")
);

-- CreateTable
CREATE TABLE "orders" (
    "orderId" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requiredDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shipedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shipAddress" TEXT NOT NULL,
    "postalCode" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "order detail" (
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unitPice" DOUBLE PRECISION NOT NULL,
    "quantinty" INTEGER NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "customer" (
    "customerId" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "fullname" TEXT,
    "address" TEXT,
    "phone" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_reportTo_key" ON "employees"("reportTo");

-- CreateIndex
CREATE UNIQUE INDEX "order detail_productId_key" ON "order detail"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_reportTo_fkey" FOREIGN KEY ("reportTo") REFERENCES "employees"("employeeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order detail" ADD CONSTRAINT "order detail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order detail" ADD CONSTRAINT "order detail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;
