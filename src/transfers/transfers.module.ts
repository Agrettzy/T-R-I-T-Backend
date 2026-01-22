import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { User } from 'src/auth/entities/user.entity';
import { Transfer } from './entities/transfer.entity';
import { AuthModule } from 'src/auth/auth.module';





@Module({
    controllers: [TransfersController],
    providers: [TransfersService],
    imports: [

        AuthModule,
        
        TypeOrmModule.forFeature([
            User,
            Transfer
        ])
    ]
})

export class TransfersModule {}
