import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/entities/user.entity";


@Entity('transfers')
export class Transfer {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Column('uuid')
    // fromAccount: string;

    // @Column('uuid')
    // toAccount: string;

    @Column('decimal', {
        precision: 9,
        scale: 2
    })
    amount: number;

    @Column('text', {
        default: 'success'
    })
    status: 'success' | 'failed' | 'pending';

    @CreateDateColumn() 
    createdAt: Date;


    @ManyToOne(
        () => User,
        ( user ) => user.senderTransfer,
        { nullable: false }
    )
    @JoinColumn({
        name: 'fromAccount'
    })
    sender: User;

    @ManyToOne(
        () => User, 
        (user) => user.receivedTransfers, 
        { nullable: false }
    )
    @JoinColumn({ 
        name: 'toAccount' 
    })
    receiver: User;

}
