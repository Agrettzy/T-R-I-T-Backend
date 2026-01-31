import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { Transfer } from 'src/transfers/entities/transfer.entity';
import { ProfileResponseDto,TransferHistoryResponseDto, BalanceResponseDto } from './dto';


@Injectable()
export class MeService {

    constructor (
        @InjectRepository( User )
        private readonly userRepository: Repository<User>,
        @InjectRepository(Transfer) 
        private readonly transferRepository: Repository<Transfer>,
    ) {}

    async getMyProfile( userPerfil: User ): Promise<ProfileResponseDto>{

        const user = await this.userRepository.findOne({
            where: { id: userPerfil.id },
            select: [ 'fullName', 'email', 'id']
        });

        return user!;

    }

    async getMyBalance( userBalnce: User ): Promise<BalanceResponseDto>{
        const user = await this.userRepository.findOne({
            where: { id: userBalnce.id },
            select: [ 'balance', 'accountKey' ]
        });

        const lastTransfer = await this.transferRepository.findOne({
            where: [ 
                { sender: { id: userBalnce.id } }, 
                { receiver: { id: userBalnce.id } }, 
            ]
        });

        return {
            balance: Number( user!.balance ).toFixed(2),
            accountKey: user!.accountKey,
            updateAt: lastTransfer?.createdAt ?? new Date()
        };
    }

    async getMyTransferHistory( userHistory: User ): Promise<TransferHistoryResponseDto[]> {    
        const transfers = await this.transferRepository.find({ 
            where: [ 
                { sender: { id: userHistory.id } }, 
                { receiver: { id: userHistory.id } }, ], 
                relations: ['sender', 'receiver'], 
                order: { createdAt: 'DESC' } 
            });


        return transfers.map(t => {
            const isSender = t.sender.id === userHistory.id;

            return { 
                transactionId: t.id, 
                amount: Number(t.amount).toFixed(2), 
                status: t.status, 
                fromName: t.sender?.fullName, 
                fromAccount: t.sender?.accountKey,
                toName: t.receiver?.fullName, 
                toAccount: t.receiver?.accountKey,
                createdAt: t.createdAt,
                type: isSender ? 'sent' : 'received'
            };
        });
    }
}