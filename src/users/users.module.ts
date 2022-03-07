import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userScheme } from 'src/schemas/users.scheme';

@Module({
  // imports: [MongooseModule.forFeature([{name: clothes.name, schema: clothScheme}])],
  imports: [MongooseModule.forFeature([{name: user.name, schema: userScheme}])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
  // controllers: [UsersController]
})
export class UsersModule {}
