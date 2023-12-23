import { Hotel } from 'src/hotel/hotel.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TYPES } from './enums/type.enum';

@Entity()
export class Room {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({ nullable: true })
  inStock: number;

  @Column({ nullable: true })
  numberPeople: string;

  @Column({ nullable: true })
  numberBed: number;

  @Column({ nullable: true })
  price: number;

  @Column({ default: TYPES.NORMAL })
  type: TYPES;

  @Column({ default: false })
  isClosed: boolean;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel: Hotel;
}
