import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}

export interface UserInterface {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    password?: string;
}