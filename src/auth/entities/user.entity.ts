import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transfer } from 'src/transfers/entities/transfer.entity';



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

    @Column('text', {
        unique: true,
        nullable: false
    })
    accountKey: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column({ 
        type: 'numeric', 
        precision: 10, 
        scale: 2, 
        default: '1500.00' 
    })
    balance: string;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];


    @OneToMany(
        () => Transfer,
        ( transfer ) => transfer.sender
    )
    senderTransfer: Transfer [];

    @OneToMany(
        () => Transfer, 
        ( transfer ) => transfer.receiver
    )
    receivedTransfers: Transfer[];


    @BeforeInsert()
    checkEmailBeforeInser(){
        this.email = this.email.toLocaleLowerCase().trim()
    }

    @BeforeUpdate()
    checkEmailBeforeUpdate(){
        this.checkEmailBeforeInser();
    }

}
