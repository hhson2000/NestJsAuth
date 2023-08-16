import { OrderDetailDto } from './orderDetail.dto';
import { OrderDetails } from '@prisma/client';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @IsNumber()
  @IsNotEmpty()
  customerId: number;
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;
  @IsNotEmpty()
  requiredDate: Date;
  @IsNotEmpty()
  shipedDate: Date;
  @IsString()
  @IsNotEmpty()
  shipAddress: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  postalCode: number;
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  orderDetails: OrderDetailDto;
}
