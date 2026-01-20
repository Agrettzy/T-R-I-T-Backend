import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto) {
        return this.usersService.login( loginUserDto );
    }


}
