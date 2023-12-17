import { Hotel } from 'src/hotel/hotel.entity';

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  ward: string;

  @Column({ nullable: true })
  lng: number;

  @Column({ nullable: true })
  lat: number;

  @Column({ nullable: true })
  apartment_number: string;

  @OneToOne(() => Hotel, (hotel) => hotel.location, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  hotel: Hotel;

  @Column()
  hotelId: number;
}
