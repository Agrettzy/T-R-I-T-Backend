import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { User } from '../entities/user.entity';
import { META_ROLES } from '../decorators/roles-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const validRoles: string [] = this.reflector.get(META_ROLES, context.getHandler() )
        const req = context.switchToHttp().getRequest();
        const user = req.user as User;


        if( !user )
            throw new UnauthorizedException('Unauthenticated user, please verify your credentials.');

        if ( !user.isActive )
            throw new ForbiddenException('Inactive account.');

        if ( !validRoles || validRoles.length === 0 ) {
            return true;
        }
        
        for (const role of user.roles ) {
            if ( validRoles.includes( role ) ) {
                return true;
            }
        }
        throw new ForbiddenException(
            `User ${ user.fullName } need a valid role `
        );

    }
}