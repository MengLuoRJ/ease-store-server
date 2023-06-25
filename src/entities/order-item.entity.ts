import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: number;

  @Column()
  merchandise_id: number;

  @Column()
  price: number;

  @Column({
    nullable: true,
  })
  price_settlement?: number;

  @Column()
  count: number;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
