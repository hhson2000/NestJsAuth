-- AlterTable
ALTER TABLE "order detail" ADD COLUMN     "orderDetailId" SERIAL NOT NULL,
ADD CONSTRAINT "order detail_pkey" PRIMARY KEY ("orderDetailId");
