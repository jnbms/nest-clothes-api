import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { clothes, clothScheme } from 'src/schemas/clothes.schema';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: clothes.name, schema: clothScheme}])],
    providers: [ClothesService],
    controllers: [ClothesController]
})
export class ClothesModule {}
