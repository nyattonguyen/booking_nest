import { Hotel } from 'src/hotel/hotel.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TYPES } from './enums/type.enum';
import { ROLES } from 'src/user/enums/role.enum';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inStock: number;

  @Column()
  numberPeople: string;

  @Column()
  numberBed: number;

  @Column()
  price: number;

  @Column({ default: TYPES.NORMAL })
  type: ROLES;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  hotel: Hotel;
}
