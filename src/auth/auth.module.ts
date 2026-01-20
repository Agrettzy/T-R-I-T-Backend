import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';


@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UsersModule,

        PassportModule.register({ defaultStrategy: 'jwt' }),
        
        JwtModule.registerAsync({
            imports: [ ConfigModule ],
            inject: [ ConfigService ],
            useFactory: ( configService: ConfigService ) => {
    
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: '2h'  // TODO Cambiar a 10min
                    }
                }
            }

        })
    ],


})
export class AuthModule {}
