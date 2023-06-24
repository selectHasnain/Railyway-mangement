import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAuthController } from './user-auth/user-auth.controller';
import { UserAuthModule } from './user-auth/user-auth.module';
import { UserAuthService } from './user-auth/user-auth.service';

@Module({
  imports: [UserAuthModule],
  controllers: [AppController, UserAuthController],
  providers: [AppService, UserAuthService],
})
export class AppModule { }
