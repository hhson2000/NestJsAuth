import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  unitPrice: number;
  @IsNotEmpty()
  quantinty: number;
  @IsNotEmpty()
  categoryId: number;
  @IsNotEmpty()
  image: string;
}
