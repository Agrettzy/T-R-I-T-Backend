import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';


import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [
        ConfigModule,

        TypeOrmModule.forFeature([ User ]),

        PassportModule.register({ defaultStrategy: 'jwt' }),

        JwtModule.registerAsync({
        imports: [ ConfigModule ],
        inject: [ ConfigService ],
        useFactory: ( configService: ConfigService ) => {
            // console.log('JWT secret', configService.get('JWT_SECRET') )
            return {
            secret: configService.get('JWT_SECRET'),
            signOptions: {
                expiresIn:'2h' //TODO cambiar a 10min
            }
            }
        }
        })
        // JwtModule.register({
        // secret: process.env.JWT_SECRET,
        // signOptions: {
        //   expiresIn:'2h'
        // }
        // })

    ],
    
    exports: [ TypeOrmModule, JwtStrategy, PassportModule, JwtModule ]
})
export class AuthModule {}
