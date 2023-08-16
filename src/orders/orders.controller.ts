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
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderUpdateDto } from 'src/auth/dto/orderUpdate.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post('createOrder')
  async createOrder(@Body() order: any) {
    return await this.orderService.createOrder(order);
  }

  @Get('getAllOrder')
  async getAllCategories() {
    try {
      return await this.orderService.getAllOrder();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete('deleteOrder/:id')
  async deleteCategory(@Param('id') id: number) {
    try {
      const remove = await this.orderService.deleteOrder(+id);
      if (remove) {
        return {
          message: 'Delete success',
          data: remove,
        };
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Delete order fail', {
        cause: new Error(),
        description: 'ERROR!',
      });
    }
  }

  @Get('orderId/:id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.orderService.getOrderById(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Patch('updateOrder/:id')
  async updateCategory(@Param('id') id: number, @Body() order: OrderUpdateDto) {
    try {
      return await this.orderService.updateOrder(+id, order);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Update order fail', {
        cause: new Error(),
        description: 'ERROR!',
      });
    }
  }
}
