import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { TransfersModule } from 'src/transfers/transfers.module';

import { MeService } from './me.service';
import { MeController } from './me.controller';

import { User } from 'src/auth/entities/user.entity';
import { Transfer } from 'src/transfers/entities/transfer.entity';

@Module({
    controllers: [MeController],
    providers: [MeService],
    imports: [

        AuthModule,
        TransfersModule,
                
        TypeOrmModule.forFeature([
            User,
            Transfer
        ])
    ]
})
export class MeModule {}
