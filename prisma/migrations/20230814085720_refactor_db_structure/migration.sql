-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_id_fkey";

-- DropIndex
DROP INDEX "products_categoryId_key";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
