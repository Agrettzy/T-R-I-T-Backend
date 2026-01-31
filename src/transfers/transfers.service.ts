import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateTransferDto } from './dto/create-transfer.dto';
import { User } from 'src/auth/entities/user.entity';
import { Transfer } from './entities/transfer.entity';



@Injectable()
export class TransfersService {
    
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        @InjectRepository(Transfer) 
        private readonly transferRepository: Repository<Transfer>,
        private readonly dataSource: DataSource
    ) {}

    async executeTransfer(createTransferDto: CreateTransferDto, senderOut: User) {
        const{ amount, toAccount } = createTransferDto;
        
        const sender = await this.userRepository.findOne({
            where: { id: senderOut.id },
            // select: ['id', 
            // 'balance', 
            // 'isActive', 
            // 'email', 
            // 'fullName', 
            // 'password', 
            // 'receivedTransfers', 
            // 'roles'
            // ], 
        });

        // console.log(sender)

        if (!sender) 
            throw new NotFoundException('Sender account not found');

        if( sender.id === toAccount )
            throw new BadRequestException('You cannot transfer to yourself.');

        if (!sender.isActive)
            throw new UnauthorizedException('Your account is inactive.');

        if( amount <= 0 )
            throw new BadRequestException('The amount must not be zero.')

        if ( Number(sender.balance) < amount )           
            throw new BadRequestException('Insufficient balance.');

        const receiver = await this.userRepository.findOneBy({ accountKey: toAccount })
        if( !receiver )
            throw new NotFoundException('Receiver account not found.');

        if (!receiver.isActive)
            throw new BadRequestException('The receiver account is inactive.');


        // Transaccion
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            const amt = Number( amount );

            if ( !Number.isFinite( amt ) || amt <= 0 )
                throw new BadRequestException('amount inválido');
        
            const senderBalance = Number( sender.balance );
            const receiverBalance = Number( receiver.balance );

            // console.log({
            //     senderBalance: sender.balance,
            //     senderBalanceType: typeof sender.balance,
            //     receiverBalance: receiver.balance,
            //     receiverBalanceType: typeof receiver.balance,
            //     amount,
            //     amountType: typeof amount,
            // });

            if (!Number.isFinite( senderBalance ) || !Number.isFinite( receiverBalance ))
                throw new InternalServerErrorException('Balance corrupto');

            if ( senderBalance < amt)
             throw new BadRequestException('Fondos insuficientes');

            sender.balance = ( senderBalance - amt ).toFixed(2);
            receiver.balance = ( receiverBalance + amt ).toFixed(2);

            await queryRunner.manager.save(User, sender);
            await queryRunner.manager.save(User, receiver);

            const transfer = this.transferRepository.create({
                amount,
                sender,
                receiver,
                status: 'success'
            });

            const saveTransfer = await queryRunner.manager.save( Transfer, transfer )
            await queryRunner.commitTransaction();

            return {
                message: 'Tranfer successfull',
                status: saveTransfer.status,
                amount: saveTransfer.amount,
                from: sender.fullName,
                to: receiver.fullName,
                transactionId: saveTransfer.id,
                createdAt: saveTransfer.createdAt
            }

        } catch (error) {

            await queryRunner.rollbackTransaction();

            // console.log("nombre:", error.name);
            // console.log("esto fallo:", error.message);
    
            throw new InternalServerErrorException('Transaction failed. Please try again later.')

        } finally {
            await queryRunner.release();
        }

    }

}
