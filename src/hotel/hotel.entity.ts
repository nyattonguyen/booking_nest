import { Location } from 'src/location/location.entity';
import { Room } from 'src/room/room.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Double,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Types } from './enums/type_hotel.enum';
@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_hotel: string;

  @Column({ default: Types.HOTEL })
  type: Types;

  @Column()
  images: [];

  @Column()
  extra: [
    {
      name: string;
      icon: null;
    },
  ];

  @Column()
  desc: string;

  @Column({ default: 9.0 })
  rate: Double;

  @Column({ default: 'Chờ phê duyệt' })
  status: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(() => Location, (location) => location.hotel)
  location: Location;

  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room;
}
