import { Injectable } from "@nestjs/common";
import {Strategy, VerifyCallback} from 'passport-google-oauth20'
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.REDIRECT_URI,
        scope: ['email', 'profile', 'openid'],
        });
    }
    // 이쪽으로 autholization code가 들어올 때 access token 변경(refresh 포함)과 함께, 그를 통한 유정 정보를 가져오는 것 같다.
    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const username = (name.givenName + ' ' + name.familyName).replace('undefined','')
        const user = {
        email: emails[0].value,
        // firstName: name.givenName,
        // lastName: name.familyName,
        username,
        picture: photos[0].value,
        accessToken
        }
        done(null, user);
    }
}