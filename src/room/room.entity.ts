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
  amount: number;

  @Column()
  numberBed: number;

  @Column()
  price: number;

  @Column({ default: TYPES.NORMAL })
  type: ROLES;

  @Column()
  ward: string;

  @Column()
  apartment_number: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  hotel: Hotel;
}
