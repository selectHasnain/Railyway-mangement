import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    phone: string;

    @Column
    email: string;

    @Column
    password: string;
}

export interface UserInterface {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    password?: string;
}