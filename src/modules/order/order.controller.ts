import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderStatus } from '../../entities/order.entity';
import { PageOptionsDto } from '@/common/dtos/pagination.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30 * 1000)
  @Get('/all/cached')
  async findAllCached(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.orderService.findAll(pageOptionsDto);
  }

  @Get('/all')
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.orderService.findAll(pageOptionsDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30 * 1000)
  @Get('/id/:id/cached')
  async findOneCached(@Param('id') id: number) {
    return await this.orderService.findOne(id);
  }

  @Get('/id/:id')
  async findOne(@Param('id') id: number) {
    return await this.orderService.findOne(id);
  }

  @Get('/code/:code')
  async findOneByCode(@Param('code') code: string) {
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
