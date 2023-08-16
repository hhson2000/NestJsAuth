import { OrderDetails } from '@prisma/client';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDetailDto {
  @IsString()
  @IsNumber()
  @IsNotEmpty()
  orderId: number;
  @IsNotEmpty()
  @IsNumber()
  productId: string;
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
  @IsNumber()
  @IsNotEmpty()
  discount: number;
}
