import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @Column()
    noOfPassengers: string;

    @Column()
    date: string;

    @ManyToOne(() => User, (user) => user.tickets)
    user: User
}

export interface ticketInterface {
    status?: string;
    noOfPassenger?: string;
    date?: string;
    user?: User;
}