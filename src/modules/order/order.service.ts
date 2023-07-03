import { OrderItem } from '../../entities/order-item.entity';
import { Order, OrderStatus } from '../../entities/order.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { v4 as uuid } from 'uuid';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '@/common/dtos/pagination.dto';
import { Merchandise } from '@/entities/merchandise.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Order>> {
    const query = this.orderRepository.createQueryBuilder('order');
    const [items, itemCount] = await query
      .orderBy('order.created_at', 'DESC')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .getManyAndCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(items, pageMetaDto);
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id },
    });
  }

  async findOneByCode(code: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { code },
    });
  }

  async findItems(id: number): Promise<OrderItem[]> {
    // return await this.orderItemRepository.find({
    //   where: { order_id: id },
    // });
    return await this.orderItemRepository
      .createQueryBuilder('order_item')
      .where('order_item.order_id = :id', { id })
      .leftJoinAndMapOne(
        'order_item.merchandise',
        Merchandise,
        'merchandise',
        'merchandise.id = order_item.merchandise_id',
      )
      .getMany();
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const timeString = () => {
      const date = new Date();
      const pad = (n: number) => (n + '').padStart(2, '0');
      return (
        `${date.getFullYear()}` +
        `${pad(date.getMonth() + 1)}` +
        `${pad(date.getDate())}` +
        `${pad(date.getHours())}` +
        `${pad(date.getMinutes())}` +
        `${pad(date.getSeconds())}`
      );
    };
    const orderCode = timeString() + uuid().slice(0, 8);
    const order = this.orderRepository.create({
      code: orderCode,
      ...createOrderDto,
    });
    const savedOrder = await this.orderRepository.save(order);
    const orderItems = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const orderItem = this.orderItemRepository.create({
          order_id: savedOrder.id,
          merchandise_id: item.merchandise_id,
          price_settlement: item.price_settlement ?? item.price,
          ...item,
        });
        return orderItem;
      }),
    );
    await this.orderItemRepository.save(orderItems);
    return savedOrder;
  }

  async updateStatus(id: number, status: OrderStatus): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    order.status = status;
    return await this.orderRepository.save(order);
  }
}
