import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  buyerId: number;

  @Column()
  quantity: number;
}
