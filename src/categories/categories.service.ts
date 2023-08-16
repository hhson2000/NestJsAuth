import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { CategoryDto } from 'src/auth/dto/categoryDto.dto';
import { ProductDto } from 'src/auth/dto/productDto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAllCateGories(): Promise<Category[]> {
    try {
      const cate = await this.prisma.category.findMany();
      return cate;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getCategoriesById(id: number): Promise<Category> {
    try {
      const cate = await this.prisma.category.findUnique({
        where: {
          id: id,
        },
      });
      return cate;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createCategory(category: CategoryDto): Promise<CategoryDto> {
    try {
      return this.prisma.category.create({
        data: {
          name: category.name,
          description: category.description,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateCategory(id: number, category: CategoryDto) {
    try {
      return this.prisma.category.update({
        where: { id },
        data: { ...category, updateAt: new Date() },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCategory(id: number) {
    try {
      return this.prisma.category.delete({ where: { id } });
    } catch (error) {
      console.log(error);
    }
  }
}
