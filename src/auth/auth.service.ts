import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { customAlphabet } from 'nanoid';
import { use } from 'passport';


const generateAccountKey = customAlphabet('0123456789', 10);


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtServices: JwtService
    ) {}
    
    async create( createUserDto: CreateUserDto) {
        try {
            
            const { password, ...userData } = createUserDto;
            const accountKey = generateAccountKey();

            const user = this.userRepository.create({
                ...userData,
                password: bcrypt.hashSync(password, 10 ),
                accountKey,
            });

            await this.userRepository.save( user )
            
            return {
                ...user,
                token: this.getJwtToken({ 
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName,
                    accountKey: user.accountKey,
                    isActivate: user.isActive,
                    roles: user.roles,
                })
            };
            
        } catch (error) {
            this.handelDBError(error);
        }
    }

    async login( loginUserDto: LoginUserDto ) {

        const { password, email } = loginUserDto;
        const user = await this.userRepository.findOne({
            where: { email },
            select: { email: true, password: true, id: true, accountKey: true, fullName: true }
        });

        if ( !user )
            throw new UnauthorizedException('Credentials not valid, please verify or create an account.')
        
        if( !bcrypt.compareSync( password, user.password ) )
            throw new UnauthorizedException('Credentials not valid, please verify or create an account.')
        
        return {
            ...user,
            token: this.getJwtToken({ 
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                accountKey: user.accountKey,
                isActivate: user.isActive,
                roles: user.roles,
            })
        };
    }

    private getJwtToken( payload: JwtPayload) {
        const token = this.jwtServices.sign( payload );
        return token;

    }

    private handelDBError(error: any): never {
        if (error.code === '23505')
            throw new BadRequestException( error.detail );
        console.log(error)
        throw new InternalServerErrorException('Please check server logs');
    }
}
 