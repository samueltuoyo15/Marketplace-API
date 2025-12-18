import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRole = 'buyer' | 'seller' | 'admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['buyer', 'seller', 'admin'],
    default: 'buyer',
  })
  role: UserRole;
}
