import { Location } from 'src/location/location.entity';
import { Room } from 'src/room/room.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Type_Prod } from './enums/type_hotel.enum';
@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name_hotel: string;

  @Column({ default: Type_Prod.HOTEL })
  type: Type_Prod;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column('simple-array', { nullable: true })
  extra: [
    {
      name: string;
      icon: null;
    },
  ];

  @Column({ nullable: true })
  desc: string;

  @Column({ type: 'decimal', default: 9 })
  rate: number;

  @Column({ default: 'Chờ phê duyệt' })
  status: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(() => Location, (location) => location.hotel)
  @JoinColumn()
  location: Location;

  @JoinColumn()
  @OneToMany(() => Room, (room) => room.hotel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  rooms: Room[];
}
