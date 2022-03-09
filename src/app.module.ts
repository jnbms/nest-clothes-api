import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClothesModule } from './clothes/clothes.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config'
// import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import {ServeStaticModule} from '@nestjs/serve-static'
import { join } from 'path';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule
      .forRoot(process.env.MONGODB_URI),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname,'..'),
    // }),
    ClothesModule,
    UsersModule,
    AuthModule,
    BoardModule,  
  ],
})
export class AppModule {}
