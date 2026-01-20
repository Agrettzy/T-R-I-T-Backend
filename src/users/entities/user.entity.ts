import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    // @Exclude()
    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;

    // @Exclude()
    @Column('decimal', { 
        default: 1500 
    }) 
    balance: number;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    // @Exclude()
    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];
}
