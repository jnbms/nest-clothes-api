import {IsIn} from 'class-validator'

export class craeteClothesDto {
    brand: string
    name: string
    image: File
    price: number
    // @IsIn(['top', 'bottom'])
    sort: string
    caegory: string
    // 분리되어야 하는 부분인거 같다.
    thickness: number
    weight: number
    flex: number
    through: number
}

export interface readClothesDto {
    name?: string
    sort?: string,
    category?: string
}