import { GymService } from './gym/gym.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityList, getDatabaseConfig } from 'config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { GymController } from './gym/gym.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => getDatabaseConfig()
    }),
    TypeOrmModule.forFeature([
      ...EntityList
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.ACCESS_TOKEN_SECRET_KEY'
    }),
    JwtModule.register({
      secret: 'PLAYGROUND_SECRET_KEY',
      signOptions: { expiresIn: '15m' }
    }),
    HttpModule,
  ],
  controllers: [
    GymController,
    WeatherController, AppController, UserController, AuthController],
  providers: [
    GymService,
    WeatherService, AppService, UserService, AuthService,
    { provide: APP_GUARD, useClass: AuthGuard }
  ],
})
export class AppModule { }
