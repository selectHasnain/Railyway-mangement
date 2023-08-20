import { ticket } from './ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        default: 'active'
    })
    status: string;

    @OneToMany(() => ticket, (ticket) => ticket.user)
    tickets: ticket[];
}

export interface UserInterface {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    password?: string;
    status?: string;
    tickets?: ticket[];
}