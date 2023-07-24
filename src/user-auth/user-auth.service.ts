import { Injectable } from '@nestjs/common';
import { CreateUserDto, QueryDto, updateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserAuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
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
   
    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
      
    async update(id: number, updateUserDto: Partial<User>): Promise<void> {
        await this.userRepository.update(id, updateUserDto);
    }
   
}