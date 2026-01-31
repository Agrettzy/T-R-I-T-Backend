import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';



@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    
    handleRequest( err, user, info) {
        
        if( info instanceof TokenExpiredError )
            throw new UnauthorizedException('The token has expired. Please log in again.')
    
        if( info instanceof JsonWebTokenError )
            throw new UnauthorizedException('Invalid token.')

        if( !user || err )
            throw new UnauthorizedException('Unauthorized. Try log again or contact an admin.')


        return user;
    }
}
