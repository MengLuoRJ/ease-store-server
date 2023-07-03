import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column()
  user_uuid: string;

  /**
   * 订单金额
   */
  @Column()
  amount: number;

  @Column({
    nullable: true,
  })
  payment_method: string;

  @Column({
    nullable: true,
  })
  credit_person: string;

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
