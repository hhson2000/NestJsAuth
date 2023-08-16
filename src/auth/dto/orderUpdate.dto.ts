import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderUpdateDto {
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
}
