import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService) {}
    
    @Get()
    readAllUsers() {
        return this.UsersService.readAll()
        // return 'asd'
    }

    @Get('local')
    async getUser(@Query('id') id, @Query('password') password){
        const user = await this.UsersService.findOne('local', id, password)
        return user
    }

    @Post("local")
    // 이 부분에서 DTO가 필요하다
    async postUser(@Query('id') id, @Query('password') password, @Query('username') username) {
        const user = await this.UsersService.findOne('local', id, password)
        console.log(user)
        if(user == null) {
            await this.UsersService.localCreate(id, password, username)
            // console.log('니놈이 문제로구나')
        }
        return this.UsersService.readAll()
    }

    @Delete("local")
    async removeUser(@Query('id') id, @Query('password') password) {
        await this.UsersService.localRemove(id, password)
        return this.UsersService.readAll()

    }
}
