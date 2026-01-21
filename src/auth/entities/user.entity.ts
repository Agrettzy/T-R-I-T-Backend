import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('decimal', {
        default: 1500
    })
    balance: number;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @BeforeInsert()
    checkEmailBeforeInser(){
        this.email = this.email.toLocaleLowerCase().trim()
    }

    @BeforeUpdate()
    checkEmailBeforeUpdate(){
        this.checkEmailBeforeInser();
    }


}
