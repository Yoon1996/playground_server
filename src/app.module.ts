import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityList, getDatabaseConfig } from 'config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

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
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, AuthService,
    { provide: APP_GUARD, useClass: AuthGuard }
  ],
})
export class AppModule { }
