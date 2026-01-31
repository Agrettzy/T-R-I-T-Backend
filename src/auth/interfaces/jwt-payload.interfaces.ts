
export interface JwtPayload {
    id: string,
    email: string,
    fullName: string,
    accountKey: string,
    isActivate: boolean,
    roles: string [],
}