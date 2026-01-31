import { Controller, Get } from '@nestjs/common';
import { MeService } from './me.service';

import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';



@Controller('me')
export class MeController {
    constructor(private readonly meService: MeService) {}

    @Get('profile')
    @Auth()
    getProfile(
        @GetUser() user: User
    ) {
        return this.meService.getMyProfile( user );
    }

    @Get('balance')
    @Auth()
    getBalance(
        @GetUser() user: User
    ) {
        return this.meService.getMyBalance( user );
    }

    @Get('history')
    @Auth()
    getHistory(
        @GetUser() user: User
    ) {
        return this.meService.getMyTransferHistory( user );
  }

}