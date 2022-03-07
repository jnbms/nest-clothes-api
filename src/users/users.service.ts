import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { user, userDocument } from 'src/schemas/users.scheme';
import { Model } from 'mongoose'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(user.name) private userModel : Model<userDocument>,
        ) {}

    readAll() {
        return this.userModel.find().exec()
    }

    // 패스포트 전용 기능으로써 쪼갤 필요가 있다.
    create(req, starategy) {
        const {email, username} = req.user

        this.userModel
            .findOne({starategy, id: email})
            .then(user => {
                // user != null ?
                if(user != null)
                    // console.log(username + ' is signed google user') :
                    this.userModel.create({
                        id: email,
                        username,
                        starategy
                    })
                    // .then( () => console.log('create user ' + username + ' to data susecess'))
            })
    }


    localCreate(id, password, username) {
        return this.userModel.create({id, password, username, starategy: 'local'})
    }

    findOne(starategy, id, password) {
        return this.userModel.findOne({starategy, id, password})
    }

    localRemove(id, password) {
        return this.userModel.findOneAndRemove({id, password, starategy: 'local'})
    }
}
