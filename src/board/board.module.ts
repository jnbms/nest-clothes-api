import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { board, boardScheme } from 'src/schemas/board.schema';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
    imports: [
        MongooseModule
            .forFeature([{name: board.name, schema: boardScheme}])
    ],
    controllers: [BoardController],
    providers: [BoardService]
})
export class BoardModule {}
