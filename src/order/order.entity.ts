import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from './orderItem.entity';
import { Hotel } from 'src/hotel/hotel.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.room, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  orderItems: OrderItem[];

  @Column()
  status: string;

  @Column({ nullable: true })
  payment: string;

  @Column({ type: 'decimal' })
  totalPrice: number;

  @Column({ default: '' })
  note: string;

  @OneToOne(() => Hotel)
  @JoinColumn()
  hotel: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: number;

  @Column('date')
  dateCheckin: string;

  @Column('date')
  dateCheckout: string;

  @CreateDateColumn({ type: 'timestamp', default: new Date(Date.now()) })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
