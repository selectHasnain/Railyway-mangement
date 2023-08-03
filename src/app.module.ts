import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAuthController } from './user-auth/user-auth.controller';
import { UsersAuthModule } from './user-auth/user-auth.module';
import { UserAuthService } from './user-auth/user-auth.service';
import { DatabaseModule } from 'database/databaseClient';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersAuthModule
  ],
  controllers: [AppController, UserAuthController],
  providers: [AppService, UserAuthService],
})
export class AppModule { }