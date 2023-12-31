import { Body, Controller, Delete, Get,Param, Post, Put, Query,Req,Request,UseGuards } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { ApiTags, ApiParam,ApiOperation, ApiBody,ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto, QueryDto,UpdateUserDto,
        LoginUserDto,AddTicketDto,ForgetPasswordDto, VerifyTokenDto,ChangePasswordDto } from './dto';
import {User,ticket } from 'database/entities';
import { AuthGuard } from 'utils/auth-guard.utils'

@ApiBearerAuth()
@ApiTags('user-auth')
@Controller('user-auth')
export class UserAuthController {
    constructor(private readonly userService: UserAuthService) { }
    
    @Get()
    @ApiOperation({
        summary: 'get all users',
        description: "get all users which are satisfying the condition"
    })
    allUsers(
        @Query() queryDto: QueryDto
    ): Promise<User[]> {
        return this.userService.getAllUsers(queryDto);
    }
    
    @Post()
    @ApiOperation({
        summary: 'create user',
        description: "create user for this project"
    })
    @ApiBody({
        type: CreateUserDto,
        required: true
    })
    async createUser(
        @Body() createUserDto: CreateUserDto
    ): Promise<User> {
        return await this.userService.createUser(createUserDto);
    }

    @Post('/login')
    @ApiOperation({
        summary: 'User login',
        description: "user login to use further apis"
    })
    @ApiBody({
        type: LoginUserDto,
        required: true
    })
    async login(
        @Body() User: LoginUserDto
    ): Promise<String> {
        return await this.userService.login(User);
    }

    @Post('forgetPassword')
    @ApiOperation({
        summary: 'password forgot',
        description: "send your email to get token and use the token to then reset Password"
    })
    @ApiBody({
        type: ForgetPasswordDto,
        required: true
    })
    async forgetPassword(
        @Body() forgetPassword: ForgetPasswordDto
    ): Promise<string> {
        return await this.userService.forgetPassword(forgetPassword.email);
    }

    
    @Post('verifyToken')
    @ApiOperation({
        summary: 'verify Token',
        description: ""
    })
    @ApiBody({
        type: VerifyTokenDto,
        required: true
    })
    async verifyToken(
        @Body() VerifyTokenDto: VerifyTokenDto
    ): Promise<string> {
        return await this.userService.UpdatePassword(VerifyTokenDto);
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    @ApiOperation({
        summary: 'get user',
        description: "get user by id"
    })
    @ApiParam({
        name: 'id',
        type: Number
    })
    user(
        @Param('id') id: number
    ): Promise<User> {
        return this.userService.getUser(id);
    }

    @UseGuards(AuthGuard)
    @Put('/:id')
    @ApiOperation({
        summary: 'update user',
        description: "update user data by passing id and information to update"
    })
    @ApiParam({
        name: 'id',
        type: Number,
        required: false
    })
    @ApiBody({
        type: UpdateUserDto,
        required: false
    })
    async updateStudent(
        @Param('id') id: number,
        @Body() updateUser: UpdateUserDto,
        @Request() req: Request
    ): Promise<String> {
        return await this.userService.updateUser(req['user'].id,updateUser);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    @ApiOperation({
        summary: 'delete user',
        description: "delete user by passing id"
    })
    @ApiParam({
        name: 'id',
        type: Number,
        required: false
    })
    async deleteUser(
        @Param('id') id: number,
        @Request() req: Request
    ): Promise<String> {
        return await this.userService.deleteUser(req['user'].id);
        
    }

    @UseGuards(AuthGuard)
    @Post('/:id/tickets')
    @ApiOperation({
        summary: 'add ticket',
        description: "add user ticket"
    })
    @ApiParam({
        name: 'id',
        type: Number,
        required: false
    })
    @ApiBody({
        type: AddTicketDto,
        required: true
    })
    async ticket(
        @Request() req: Request,
        @Body() addTicketDto: AddTicketDto
    ): Promise<ticket> {
        return await this.userService.addTicket(req['user'], addTicketDto);
    }

    @Get('/:id/ticket')
    @ApiOperation({
        summary: 'get single or all ticket',
        description: "get single ticket by passing id otherwise will return all tickets"
    })
    async tickets(
        @Query() queryDto: QueryDto
    ): Promise<ticket[]> {
        return await this.userService.getTicket(queryDto);
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    @ApiOperation({
        summary: 'get user tickets',
        description: "get user tickets"
    })
    @ApiParam({
        name: 'id',
        type: Number,
        required: false
    })
    async userTickets(
        @Param('id') id: number,
        @Request() req: Request
    ): Promise<User> {
        return await this.userService.getUserTickets(req['user'].id);
    }

    @UseGuards(AuthGuard)
    @Post('changePassword')
    @ApiOperation({
        summary: 'Change Password',
        description: ""
    })
    @ApiBody({
        type: ChangePasswordDto,
        required: true
    })
    async changePassword(
        @Body() ChangePasswordDto: ChangePasswordDto,
        @Request() req: Request
    ): Promise<string> {
        const userId = req['user'].id;
        return await this.userService.changePassword(userId, ChangePasswordDto);
    }

}