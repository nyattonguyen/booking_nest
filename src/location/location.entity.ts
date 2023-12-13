import { Hotel } from 'src/hotel/hotel.entity';

import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contry: string;

  @Column()
  district: string;

  @Column()
  ward: string;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  apartment_number: string;

  @OneToOne(() => Hotel, (hotel) => hotel.location)
  hotel: Hotel;
}
