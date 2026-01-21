import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserRoleGuard } from '../guards/user-role.guard';
import { ValidRoles } from '../interfaces';
import { RolesProtected } from './roles-protected.decorator';



export function Auth(...roles: ValidRoles[]) {

    return applyDecorators(
        ...(roles.length > 0 ? 
        [RolesProtected(...roles)] : []), 
        UseGuards(AuthGuard(), UserRoleGuard)

        // RolesProtected( ValidRoles.admin ),
        // UseGuards( AuthGuard(), UserRoleGuard )

    );

}