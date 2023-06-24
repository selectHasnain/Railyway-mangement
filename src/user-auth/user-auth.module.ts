import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';

@Module({
  imports: [],
  controllers: [UserAuthController],
  providers: [UserAuthService]
})
export class UserAuthModule { }