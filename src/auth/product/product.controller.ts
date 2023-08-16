import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ProductService } from './product.service';
import { ProductDto } from 'src/auth/dto/productDto.dto';

@Controller('product')
@UseGuards(JwtGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('createProduct')
  async createCategory(@Body() product: ProductDto) {
    return await this.productService.createProduct(product);
  }

  @Get('getAllProduct')
  async getAllCategories() {
    try {
      return await this.productService.getAllProduct();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Get('productId/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productService.getProductById(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Patch('updateProduct/:id')
  async updateCategory(@Param('id') id: string, @Body() product: ProductDto) {
    try {
      return await this.productService.updateProduct(id, product);
    } catch (error) {
      throw new BadRequestException('Update category fail', {
        cause: new Error(),
        description: 'ERROR!',
      });
    }
  }

  @Delete('deleteProduct/:id')
  async deleteCategory(@Param('id') id: string) {
    try {
      const remove = await this.productService.deleteProduct(id);
      if (remove) {
        return {
          message: 'Delete success',
          data: remove,
        };
      }
    } catch (error) {
      throw new BadRequestException('Delete category fail', {
        cause: new Error(),
        description: 'ERROR!',
      });
    }
  }
}
