import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import {Document} from 'mongoose'

export type clothesDocument = clothes & Document

@Schema()
export class clothes {
    @Prop()
    brand: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    price: number;

    @Prop({required: true})
    sort: "top" | "bottom"

    @Prop()
    category: string

    // 따로 분리를 해야하는 건지, 어떻게 분리해야하는 지.
    // description도 필요

    @Prop()
    viewCount: number

    @Prop()
    likeCount: number

    // property
    @Prop()
    thickness: number

    @Prop()
    weight: number  

    @Prop()
    flex: number

    @Prop()
    through: number
}

export const clothScheme = SchemaFactory.createForClass(clothes)