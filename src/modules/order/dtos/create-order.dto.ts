import { OrderStatus, PaymentMethod } from '../../../entities/order.entity';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  amount: string;

  @IsString()
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @IsString()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsArray()
  @ValidateNested({ each: true })
  items: {
    merchandise_id: number;
    price: number;
    price_settlement?: number;
    count: number;
  }[];

  @IsDateString()
  start_at: Date;

  @IsDateString()
  close_at: Date;
}
