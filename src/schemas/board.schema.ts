import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import {Document} from 'mongoose'

export type boardDocument = board & Document

@Schema()
export class board {
    @Prop()
    clothe_id: string;

    @Prop()
    ratio: number;

    @Prop()
    content: string;

    // mongo DB's default timezone is UTC, monent.js를 사용했지만 변화되지 않았다.
    // 시간 자체 문제보다 표기 상의 문제인거 같아, 문제되는 9시간을 추가했다.
    @Prop({type: Date, default: Date.now})
    createdAt
}

export const boardScheme = SchemaFactory.createForClass(board)