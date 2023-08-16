import {
  BadRequestException,
  Delete,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { Orders } from '@prisma/client';
import { OrderDto } from 'src/auth/dto/order.dto';
import { OrderUpdateDto } from 'src/auth/dto/orderUpdate.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(order: OrderDto): Promise<boolean> {
    try {
      console.log(order);
      const newOrder = await this.prisma.orders.create({
        data: {
          customerId: order.customerId,
          employeeId: order.employeeId,
          description: order.description,
          requiredDate: new Date(order.requiredDate),
          shipedDate: new Date(order.shipedDate),
          shipAddress: order.shipAddress,
          postalCode: order.postalCode,
          totalPrice: order.totalPrice,
        },
      });
      if (newOrder != null) {
        const orderDetailsData = order.orderDetails;
        console.log(orderDetailsData);
        const orderDetailPromises = await this.prisma.orderDetails.create({
          data: {
            orderId: newOrder.orderId, // ID của đơn hàng vừa tạo
            productId: orderDetailsData.productId,
            unitPrice: orderDetailsData.unitPrice,
            quantity: orderDetailsData.quantity,
            discount: orderDetailsData.discount,
          },
        });
        if (orderDetailPromises == null) {
          throw new BadRequestException('Create order fail', {
            cause: new Error(),
            description: 'ERROR!',
          });
        }
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Create order fail', {
        cause: new Error(),
        description: 'ERROR!',
      });
    }
  }

  async getAllOrder(): Promise<Orders[]> {
    try {
      const order = await this.prisma.orders.findMany({
        include: {
          orderDetails: true,
        },
      });
      return order;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteOrder(id: number) {
    try {
      return this.prisma.orders.delete({ where: { orderId: id } });
    } catch (error) {
      console.log(error);
    }
  }

  async updateOrder(
    id: number,
    order: OrderUpdateDto,
  ): Promise<OrderUpdateDto> {
    try {
      return this.prisma.orders.update({
        where: { orderId: id },
        data: {
          ...order,
          requiredDate: new Date(order.requiredDate),
          shipedDate: new Date(order.shipedDate),
          updateAt: new Date(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getOrderById(id: number): Promise<Orders> {
    try {
      const order = await this.prisma.orders.findUnique({
        include: {
          orderDetails: true,
        },
        where: {
          orderId: +id,
        },
      });
      return order;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
