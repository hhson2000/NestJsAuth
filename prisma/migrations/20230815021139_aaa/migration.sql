/*
  Warnings:

  - The primary key for the `order detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderDetailId` on the `order detail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order detail" DROP CONSTRAINT "order detail_pkey",
DROP COLUMN "orderDetailId";
