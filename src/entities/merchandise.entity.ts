import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Merchandise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  barcode: string;

  @Column()
  price: number;

  @Column({
    nullable: true,
  })
  picture_url: string;

  @Column({
    nullable: true,
  })
  specs: string;

  @Column({
    nullable: true,
  })
  category: string;

  @Column()
  shilf_life: number;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  tags: string[];

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  quick_tags: string[];

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
