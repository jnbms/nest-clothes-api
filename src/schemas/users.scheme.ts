import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import {Document} from 'mongoose'

export type userDocument = user & Document

@Schema()
export class user {
    @Prop({required: true, lowercase: true})
    id: string;

    // 다른 플랫폼 유저일 경우 가져올 수 가 없다.
    @Prop()
    password: string;

    @Prop()
    username: string;
    
    @Prop({required: true})
    starategy: string

}

export const userScheme = SchemaFactory.createForClass(user)