import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { ApiTags, ApiParam, ApiQuery, ApiOperation, ApiBody, ApiNoContentResponse } from '@nestjs/swagger';
import { CreateUserDto, QueryDto,updateUserDto } from './dto';
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

    @Put(':id')
    @ApiOperation({
        summary: 'update users',
        description: "update user by id"
    })
    async update (@Param('id') id: number, @Body() updateUserDto: updateUserDto): Promise<any> {
      return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'delete users',
        description: "delete user by id"
    })
    deleteUser(@Param('id') id: number): 
    Promise<void> {
      return this.userService.delete(id);
    }
}