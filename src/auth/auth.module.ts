import { CacheModule, Module } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './passport/google.strategy';
import { KaKaoStrategy } from './passport/kakao.strategy';
import { NaverStrategy } from './passport/naver.strategy ';


@Module({
  imports: [UsersModule, CacheModule.register()],
  providers: [
    AuthService, CacheService
    , GoogleStrategy, NaverStrategy, KaKaoStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
