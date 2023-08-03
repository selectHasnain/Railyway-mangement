import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, QueryDto, UpdateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserInterface } from 'database/entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Login } from 'types';

@Injectable()
export class UserAuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        private jwtService: JwtService
    ) { }

    async createUser(createUser: CreateUserDto): Promise<User> {
        return this.userRepository.save(createUser);
    }

    getUser(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }

    getAllUsers(queryDto: QueryDto): Promise<User[]> {
        return this.userRepository.find(queryDto);
    }
   
    async deleteUser(id: number): Promise<String> {
        await this.userRepository.update(id, { status: "deleted" });
        return "user deleted successfully";
    }
      
    async updateUser(id: number, user: UserInterface): Promise<String> {
        await this.userRepository.update(id, user);
        return "user updated successfully";
    }

    async login(user: Login): Promise<String> {
        let authenticatedUser = await this.userRepository.findOne({
            where: {
                ...user
            }
        });
        authenticatedUser = JSON.parse(JSON.stringify(authenticatedUser));

        if (!authenticatedUser) {
            throw new NotFoundException("Incorrect email or password");
        }

        let accessToken = this.jwtService.sign(authenticatedUser, { secret: '${process.env.JWT_SECRET}' });

        return accessToken;
    }
   
}