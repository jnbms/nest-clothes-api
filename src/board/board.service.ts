import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { board, boardDocument } from 'src/schemas/board.schema';
import {Model} from 'mongoose'
import { createBoardDto } from './board.dto';

@Injectable()
export class BoardService {
    constructor(@InjectModel(board.name) private boardModel: Model<boardDocument>){}

    findAll() {
        return this.boardModel.find()
    }

    create(createBoardDto: createBoardDto){
        this.boardModel.create(createBoardDto)
    }
    findAllbyClotheId(id) {
        return this.boardModel.find({clothe_id: id})
    }
    async delete(id){
        await this.boardModel.deleteOne({_id: id})
        return this.boardModel.find()
    }
}
