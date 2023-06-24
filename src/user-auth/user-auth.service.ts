import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAuthService {

    createUser(): string {
        return "This will create user";
    }

    getUser(id: number): string {
        return `This will return user of id: ${id}`;
    }

    getAllUsers(): string {
        return `This will return user`;
    }

}