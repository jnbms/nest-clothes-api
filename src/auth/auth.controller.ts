import { Controller, Dependencies, Get, Param, Query, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CacheService } from 'src/cache/cache.service';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private cacheService: CacheService
        ) {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    // 가드는 일종의 필터이다. 패스포트 정보가 일치하는 지 확인 후, query로 전송된 code와 state 정보로
    // access/refresh toeken과 그 외의 정보가 validator 함수를 통해 처리된 후, req로 들어오는 것이다.
    googleRedirect(@Req() req) {
        // 백엔드에 정보 저장 // 서비스를 가져오는 것이 좋은 방법인가?
        this.usersService.create(req, 'google')
        // 신원 확인 후, 프론트엔드로 원하는 정보 전송
        const username = this.authService.sendUserName(req)
        this.cacheService.setCurrentUser(username)
        return username
    }

    @Get('/naver/callback')
    @UseGuards(AuthGuard('naver'))
    naverRedirect(@Req() req) {
        console.log(req)
        this.usersService.create(req, 'naver')
        const username = this.authService.sendUserName(req)
        return username
    }

    @Get('/kakao/callback')
    @UseGuards(AuthGuard('kakao'))
    kakaoRedirect(@Req() req) {
        console.log(req)
        this.usersService.create(req, 'kakao')
        const username = this.authService.sendUserName(req)
        return username
    }
}
