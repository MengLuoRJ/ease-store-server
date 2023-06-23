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
  price: number;

  @Column()
  specs: string;

  @Column()
  category: string;

  @Column({
    nullable: true,
  })
  shilf_life: number;

  @Column({
    nullable: true,
  })
  tags: string;

  @Column({
    nullable: true,
  })
  quick_tags: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
