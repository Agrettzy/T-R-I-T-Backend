import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';



export const GetUser = createParamDecorator(
    ( data: string, ctx: ExecutionContext ) => {

        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        if( !user )
            throw new UnauthorizedException('Unauthenticated user, please verify your credentials.');

        if (!data) {
            return { 
                id: user.id, 
                email: user.email, 
                roles: user.roles, 
                isActive: user.isActive, 
                fullName: user.fullName, 
            };
        }
        
        return user[data];
    }
);