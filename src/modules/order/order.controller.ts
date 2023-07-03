import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderStatus } from '../../entities/order.entity';
import { PageOptionsDto } from '@/common/dtos/pagination.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/all')
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.orderService.findAll(pageOptionsDto);
  }

  @Get('/id/:id')
  async findOne(id: number) {
    return await this.orderService.findOne(id);
  }

  @Get('/code/:code')
  async findOneByCode(code: string) {
    return await this.orderService.findOneByCode(code);
  }

  @Get('/items/:id')
  async findItems(@Param('id') id: number) {
    return await this.orderService.findItems(id);
  }

  @Post('/create')
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Patch('/update/:id/status')
  async updateStatus(
    @Param('id') id: number,
    @Query('status') status: OrderStatus,
  ) {
    return await this.orderService.updateStatus(id, status);
  }
}
