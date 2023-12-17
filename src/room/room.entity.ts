import { Hotel } from 'src/hotel/hotel.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TYPES } from './enums/type.enum';
import { ROLES } from 'src/user/enums/role.enum';

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
  type: ROLES;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel: Hotel;
}
