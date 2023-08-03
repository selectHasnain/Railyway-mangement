import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { ApiTags, ApiParam, ApiQuery, ApiOperation, ApiBody, ApiNoContentResponse } from '@nestjs/swagger';
import { CreateUserDto, QueryDto,UpdateUserDto,LoginUserDto } from './dto';
import { User } from 'database/entities';

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

    @Put('/:id')
    @ApiOperation({
        summary: 'update user',
        description: "update user data by passing id and information to update"
    })
    @ApiParam({
        name: 'id',
        type: Number,
        required: true
    })
    @ApiBody({
        type: UpdateUserDto,
        required: false
    })
    async updateStudent(
        @Param('id') id: number,
        @Body() updateUser: UpdateUserDto
    ): Promise<String> {
        return await this.userService.updateUser(id, updateUser);
    }

    @Delete('/:id')
    @ApiOperation({
        summary: 'delete user',
        description: "delete user by passing id"
    })
    @ApiParam({
        name: 'id',
        type: Number,
        required: true
    })
    async deleteUser(
        @Param('id') id: number
    ): Promise<String> {
        return await this.userService.deleteUser(id);
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
}