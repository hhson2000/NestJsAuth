import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category, Product } from '@prisma/client';
import { ProductDto } from 'src/auth/dto/productDto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { idgenerator } from 'src/utils/idgenerator';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(product: ProductDto): Promise<ProductDto> {
    const id = idgenerator();
    try {
      return this.prisma.product.create({
        data: {
          productId: id,
          name: product.name,
          description: product.description,
          unitPrice: product.unitPrice,
          quantinty: product.quantinty,
          categoryId: product.categoryId,
          image: product.image,
        },
      });
    } catch (error) {
      throw new BadRequestException('Create product fail', {
        cause: new Error(),
        description: 'ERROR!',
      });
    }
  }

  async updateProduct(id: string, product: ProductDto): Promise<ProductDto> {
    try {
      return this.prisma.product.update({
        where: { productId: id },
        data: {
          ...product,
          updateAt: new Date(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id: string) {
    try {
      return this.prisma.product.delete({ where: { productId: id } });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProduct(): Promise<Product[]> {
    try {
      const prd = await this.prisma.product.findMany();
      return prd;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const cate = await this.prisma.product.findUnique({
        where: {
          productId: id,
        },
      });
      return cate;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
