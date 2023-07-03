import { OrderStatus } from '../../../entities/order.entity';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  user_uuid: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  payment_method?: string;

  @IsString()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @IsString()
  credit_person?: string;

  @IsArray()
  @ValidateNested({ each: true })
  items: {
    merchandise_id: number;
    price: number;
    price_settlement?: number;
    count: number;
  }[];

  @IsDate()
  start_at: Date;

  @IsDate()
  close_at: Date;
}
