import { Injectable } from "@nestjs/common";
// import {Strategy, VerifyCallback} from 'passport-google-oauth20'
import { Strategy, VerifyCallback} from 'passport-naver'
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
    constructor() {
        super({
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: process.env.NAVER_REDIRECT_URI,
        // scope: ['email', 'profile', 'openid'],
        });
    }
    // 이쪽으로 autholization code가 들어올 때 access token 변경(refresh 포함)과 함께, 그를 통한 유정 정보를 가져오는 것 같다.
    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const user  = {
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.displayName,
            provider: 'naver',
            naver: profile._json
        }
        done(null, user)
    }
}