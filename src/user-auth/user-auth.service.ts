import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {QueryDto, VerifyTokenDto} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import {User, UserInterface,ticket,ticketInterface } from 'database/entities';
import {Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Login, Query } from 'types';
import * as bcrypt from 'bcrypt';
import { encrypt,sendMail,generateToken } from 'utils/helper';

@Injectable()
export class UserAuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(ticket)
        private ticketRepository: Repository<ticket>,

        private jwtService: JwtService,
    ) { }

    async createUser(user: UserInterface): Promise<User> {
        user.password = await bcrypt.hash(user.password, 10);
        return this.userRepository.save(user);
    }

    async login(user: Login): Promise<String> {
        let authenticatedUser: User = await this.userRepository.findOne({
            where: {
                email: user.email
            }
        });
        authenticatedUser = JSON.parse(JSON.stringify(authenticatedUser));

        if (!authenticatedUser) {
            throw new NotFoundException("Incorrect email or password");
        }
        
        const isMatch: Boolean = await bcrypt.compare(user.password, authenticatedUser.password);

        if (!isMatch) {
            throw new NotFoundException("Incorrect email or password");
        }

        let accessToken = this.jwtService.sign(authenticatedUser, { secret: process.env.JWT_SECRET });
        
        return  await encrypt(accessToken);;
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

    // Tickets Apis

    async addTicket(user: User, addTicket: ticketInterface): Promise<ticket> {
        addTicket.user = user;
        return this.ticketRepository.save(addTicket);
    }

    async getTicket(queryDto: Query): Promise<ticket[]> {
        let queryCondition: any = {};

        queryDto.id && (queryCondition.id = queryDto.id);

        return this.ticketRepository.find({
            where: queryCondition
        });
    }

    async getUserTickets(id: number): Promise<User> {
        return this.userRepository.findOne({
            where: { id },
            relations: {
                tickets: true,
            },
        });
    }

    async forgetPassword(email: string): Promise<string> {
        let user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException("user does not exist");
        }

        let token = generateToken();
        return sendMail(email, token);
    }

    /************************************************************************* */
    async verifyTokenAndUpdatePassword(verifyTokenDto: VerifyTokenDto): Promise<string> {
       
        const { email, token,newPassword} = verifyTokenDto;
    
        const user = await this.userRepository.findOne({ where: { email } });
       
        if (!user) {
          throw new Error('User not found');
        }
        
        console.log(verifyTokenDto)

        if (user.token !== token) {
            console.log(sendMail.prototype)
          throw new Error('Invalid OTP');
        }
    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
    
        await this.userRepository.save(user)

        return 'Password updated successfully';
    }


   
      }
