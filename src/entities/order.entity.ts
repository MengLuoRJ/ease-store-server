import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PaymentMethod {
  ALIPAY = 'alipay',
  WECHAT = 'wechat',
  UNIONPAY = 'unionpay',
  CASH = 'cash',
}

export enum OrderStatus {
  CREATED = 'created',
  CREDIT = 'credit',
  PAID = 'paid',
  CLOSED = 'closed',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  /**
   * 订单金额
   */
  @Column()
  amount: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
  })
  payment_method: PaymentMethod;

  /**
   * 订单状态
   */
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status: OrderStatus;

  @Column({ type: 'timestamptz' })
  start_at: Date;

  @Column({ type: 'timestamptz' })
  close_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
