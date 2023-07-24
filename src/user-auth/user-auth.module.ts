import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'database/entities';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [TypeOrmModule]
})
export class UserAuthModule { }