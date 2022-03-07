import { Injectable } from "@nestjs/common";
import {Strategy, VerifyCallback} from 'passport-kakao'
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class KaKaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor() {
        super({
            clientID: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_SECRET,
            callbackURL: process.env.KAKAO_REDIRECT_URI,
        });
    }
    // 이쪽으로 autholization code가 들어올 때 access token 변경(refresh 포함)과 함께, 그를 통한 유정 정보를 가져오는 것 같다.
    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        done(null, profile);
    }
}