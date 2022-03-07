import { Body, Controller, Delete, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { board } from 'src/schemas/board.schema';
import { createBoardDto, createContentDto } from './board.dto';
import { BoardService } from './board.service';

import * as moment from 'moment-timezone'
moment.tz.setDefault("Asia/Seoul")


@Controller('board')
export class BoardController {
    
    constructor(private boardSerivce: BoardService) {}

    @Get("")
    async findAll() {
        return await this.boardSerivce.findAll()
    }

    @Get("/:id")
    async findAllbyClotheId(@Param('id') id): Promise<board[]> {
        return await this.boardSerivce.findAllbyClotheId(id)
    }

    @Post("/:id")
    async post(@Body() body: createContentDto, @Param('id') id) {
        await this.boardSerivce.create({
            ...body,
            clothe_id: id,
        })

    }
    @Delete("/:id")
    async delete(@Param('id') id) {
        await this.boardSerivce.delete(id)
    }
}
