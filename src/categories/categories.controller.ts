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
import { CategoriesService } from './categories.service';
import { ProductDto } from 'src/auth/dto/productDto.dto';
import { CategoryDto } from 'src/auth/dto/categoryDto.dto';

@Controller('categories')
@UseGuards(JwtGuard)
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}
  @Get('getAllCategories')
  async getAllCategories() {
    try {
      return await this.categoryService.getAllCateGories();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Get('cate/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.categoryService.getCategoriesById(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('createCategory')
  async createCategory(@Body() category: CategoryDto) {
    try {
      return await this.categoryService.createCategory(category);
    } catch (error) {
      throw new BadRequestException('Create category fail', {
        cause: new Error(),
        description: 'ERROR!',
      });
    }
  }

  @Patch('updateCategory/:id')
  async updateCategory(@Param('id') id: number, @Body() category: CategoryDto) {
    try {
      return await this.categoryService.updateCategory(+id, category);
    } catch (error) {
      throw new BadRequestException('Update category fail', {
        cause: new Error(),
        description: 'ERROR!',
      });
    }
  }

  @Delete('deleteCategory/:id')
  async deleteCategory(@Param('id') id: number) {
    try {
      const remove = await this.categoryService.deleteCategory(+id);
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
