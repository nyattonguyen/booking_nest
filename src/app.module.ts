import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user.entity';
import { Hotel } from './hotel/hotel.entity';
import { HotelModule } from './hotel/hotel.module';
import { Location } from './location/location.entity';
import { Room } from './room/room.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE_NAME'),
        entities: [User, Hotel, Location, Room],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ConfigModule.forRoot(),
    HotelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
