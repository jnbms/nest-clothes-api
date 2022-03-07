import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { clothes, clothesDocument } from 'src/schemas/clothes.schema';
import { craeteClothesDto, readClothesDto } from './clothes.dto';

@Injectable()
export class ClothesService {
    constructor(@InjectModel(clothes.name) private clothesModel: Model<clothesDocument>){}

    async create(craeteclothesDto: craeteClothesDto) {
        const createClothes = 
            new this.clothesModel(
                {
                    ...craeteclothesDto,
                    viewCount: 0,
                    likeCount: 0,
                })
        return createClothes.save()
    }

    async findAll(readClothesDto?: readClothesDto): Promise<clothes[]> {

        return (
            readClothesDto == undefined ? 
                await this.clothesModel.find().exec() :
                await this.clothesModel.find(readClothesDto).exec()
        )
    }
    async findOneById(id: string): Promise<clothes[]> {
        return await this.clothesModel.findOne({_id: id})
    }

    async findList(list: Array<string>) {
        return await this.clothesModel.find({
            name : {
                $in: list
            }
        })
    }

    async update(_id: string, createClothesDto: craeteClothesDto) {
        return this.clothesModel.updateOne({_id}, createClothesDto)
    }
    
    async remove(id: string) {
        // 제거 이후, 이름을 파악해서 이미지 파일 제거를 위해 findOneAndDelete를 사용한다.
        let item
        await this.clothesModel.findOneAndDelete({_id: id})
            .then(it => item = it)
        return item
    }

    async updateViewCount(_id: string) {
        let document
        await this.clothesModel.findByIdAndUpdate(_id,{$inc: {viewCount: 1}})
            .then(result => document = result)
        return document
    }
}
