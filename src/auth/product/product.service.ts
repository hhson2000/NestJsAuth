import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { ProductDto } from 'src/auth/dto/productDto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(product: ProductDto): Promise<ProductDto> {
    try {
      return this.prisma.product.create({
        data: {
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
}
