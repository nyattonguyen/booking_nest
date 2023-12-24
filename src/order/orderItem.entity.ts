import { Room } from 'src/room/room.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class OrderItem {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ type: 'string', default: 'Order no name' })
  name: string;

  @Column({ type: 'number' })
  price: number;

  @Column({ type: 'number', default: 1 })
  quantity: number;

  @ManyToOne(() => Room)
  @JoinColumn()
  room: number;
}
