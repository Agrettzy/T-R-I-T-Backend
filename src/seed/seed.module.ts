import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './../auth/auth.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

import { User } from 'src/auth/entities/user.entity';
import { Transfer } from 'src/transfers/entities/transfer.entity';


@Module({
    controllers: [SeedController],
    providers: [SeedService],
    imports: [
        AuthModule,

        TypeOrmModule.forFeature([
            User,
            Transfer
        ])

    ]
})


export class SeedModule { }
