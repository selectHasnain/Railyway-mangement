import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'database/entities';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    global: true,
    signOptions: { expiresIn: '60s' },
})],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [TypeOrmModule]
})
export class UsersAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply().forRoutes();
  }
}