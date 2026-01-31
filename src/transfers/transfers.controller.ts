import { Controller, Post, Body } from '@nestjs/common';

import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { Auth, GetUser } from '../auth/decorators';

import { User } from 'src/auth/entities/user.entity';


@Controller('transfers')
export class TransfersController {
    constructor(private readonly transfersService: TransfersService) {}

    @Post('execute')
    @Auth()
    transfer(
        @Body() createTransferDto: CreateTransferDto,
        @GetUser() user: User
    ) {
        return this.transfersService.executeTransfer( createTransferDto, user)
    }

}