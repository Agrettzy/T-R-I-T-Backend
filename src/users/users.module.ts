import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        TypeOrmModule.forFeature ([ User ]),
    ],

    exports: [ TypeOrmModule, UsersService]
})


export class UsersModule {}
