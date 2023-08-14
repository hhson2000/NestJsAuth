import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
}
