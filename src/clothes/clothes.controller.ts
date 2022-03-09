import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { clothes } from 'src/schemas/clothes.schema';
import { craeteClothesDto } from './clothes.dto';
import { ClothesService } from './clothes.service';
// as 로 불러와야 동작 가능
import * as fs from "fs"

@Controller('clothes')
export class ClothesController {
    constructor(private clothesService: ClothesService) {}

    @Get("/")
    getAllClothes(@Query('id') id?: string): Promise<clothes[]> {
        return id == undefined ?
            this.clothesService.findAll() :
            this.clothesService.findOneById(id).catch(err => err)

    }
    // 이 메서드 선언이 상단에 있으므로 /list가 붙으면 아래 작성된 메서드들과 충돌하지 않는다.
    @Post("/list")
    async listedClothes(@Body('list') list) {
        const items = await this.clothesService.findList(list)
        return items
    }
    // method가 다르므로 상관 없을 것으로 보인다.
    @Get('/:sort')
    sortedClothes(@Param() params, @Query('name') name?: string) {
        return name == undefined ?
            this.clothesService.findAll(params) :
            this.clothesService.findAll({...params,name})
    }
    @Get('/:sort/:category')
    sortedNamedClothes(@Param() params: object, @Query('name') name?: string) {
        return name == undefined ?
            this.clothesService.findAll(params) :
            this.clothesService.findAll({...params, name})
    }

    @Post()
    // file Interceptor 사용 시, form-data(json, x-www 등의 row data 아닌)로 text 전송이 가능해진다.
    // 'image'를 키 값으로 가장 하단에 file로 등록하면 다른 body도 전송이 된다. 이유는 모름..
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: (req, file, callback) => {
                //valicator가 필요할 것 같음 
                callback(null, './images/clothes/' + req.body.sort)
            },
            filename: (req, file, callback) => {
                callback(null, req.body.name + '.jpg')
            }
        })
    }))
    async postClothes(
        @Body() createClothesDto: craeteClothesDto,
        ): Promise<clothes[]> {
            await this.clothesService.create(createClothesDto)
            return this.clothesService.findAll()
    }
    // 변경
    @Put(':id')
    async putClothes(
        @Param('id') id: string,
        @Body() craeteClothesDto: craeteClothesDto
        ) {
        await this.clothesService.update(id, craeteClothesDto)
        return this.clothesService.findAll();
    }
    @Delete(':id')
    async deleteClothes(@Param('id') id: string) {
        const clothe = await this.clothesService.remove(id)
        fs.unlinkSync("./images/clothes/" + clothe.sort + "/" + clothe.name + ".jpg")
        return this.clothesService.findAll()
    }

    @Post('/viewCount')
    async increaseViewCount(@Query('id') id) {
        return await this.clothesService.updateViewCount(id)
    }
}
