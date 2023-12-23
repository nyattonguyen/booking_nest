import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrderItem } from './orderItem.entity';
@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.room, { cascade: true })
  orderItems: OrderItem[];

  @Column()
  status: string;

  @Column({ nullable: true })
  payment: string;

  @Column({ type: 'decimal' })
  totalPrice: number;

  @Column({ default: '' })
  note: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column('date')
  dateCheckin: string;

  @Column('date')
  dateCheckout: string;
}
