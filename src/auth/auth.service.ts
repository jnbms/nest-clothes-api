import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    
    sendUserName(req) {
        if (!req.user) {
            return 'no get user info from login'
        } else {
            // 프론트엔드로 원하는 정보 리턴
            const {username} = req.user
            // 이 처리를 passport에서 했어야 중복처리를 하지 않았을 것이다.
            // const name = (firstName + ' ' + lastName).replace('undefined','')
            return {username}
        }
    }
}
