import { Controller, Post, Body, Get, UseGuards, } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser } from './decorators';

import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces';



@Controller('auth')
export class AuthController {

    constructor( private readonly authService: AuthService) {}

    @Post('register')
    createUser(@Body() createUserDto: CreateUserDto ) {
        return this.authService.create( createUserDto );
    }

    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto ) {
        return this.authService.login( loginUserDto );
    }

    @Get('private')
    @Auth()
    testinPrivateRoute(
        @GetUser() user: User
    ) {
        return {
            ok: true,
            message: 'Acceso autorizado',
            user
        }
    }

    // @Get('private2')
    // @Auth( ValidRoles.admin )
    // testinPrivateRoute2(
    //     @GetUser() user: User
    // ) {
    //     return {
    //         ok: true,
    //         message: 'Acceso autorizado Admin',
    //         user
    //     }
    // }
    
    
}
