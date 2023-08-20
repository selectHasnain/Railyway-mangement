import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, QueryDto, UpdateUserDto,AddTicketDto,resetPasswordDto} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import {User, UserInterface,ticket,ticketInterface } from 'database/entities';
import { FindOneOptions, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Login, Query } from 'types';
import * as bcrypt from 'bcrypt';
import { encrypt } from 'utils/helper';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer'

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

    async generateResetToken(email:User["email"]): Promise<string> {
      const token = crypto.randomBytes(2).toString('hex');
      console.log(`Reset Token for ${email}: ${token}`);
      return token;
    }
    async sendResetPasswordEmail(email:User["email"], token: string): Promise<void> {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'ha2320133@gmail.com',
          pass: 'mwrrlysoseyiqjmf',
        },
      });
  
      const mailOptions = {
        from: 'ha2320133@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: `Click <a href="http://yourwebsite.com/reset-password/${token}">here</a> to reset your password.`,
      };
  
      await transporter.sendMail(mailOptions);
    }

  

// ...

async requestPasswordReset(resetPasswordDto: resetPasswordDto): Promise<void> {
const findOptions: FindOneOptions<User> = {
  where: { email: resetPasswordDto.email },
};

const user = await this.userRepository.findOne(findOptions);

if (!user) {
  throw new Error('User not found');
}

const resetToken = await this.generateResetToken(user.email);
 await this.sendResetPasswordEmail(user.email, resetToken);
}
  }
