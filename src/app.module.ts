import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { HotelController } from './hotel/hotel.controller';
import { HotelModule } from './hotel/hotel.module';
import { LocationService } from './location/location.service';
import { LocationModule } from './location/location.module';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';

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
        entities: [User, Category],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    CategoryModule,
    ConfigModule.forRoot(),
    HotelModule,
    LocationModule,
    RoomModule,
  ],
  controllers: [AppController, HotelController, RoomController],
  providers: [AppService, LocationService],
})
export class AppModule {}
