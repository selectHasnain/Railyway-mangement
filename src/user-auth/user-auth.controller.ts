import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { ApiTags, ApiParam, ApiQuery, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateUserDto, QueryDto } from './dto';

@ApiTags('user-auth')
@Controller('user-auth')
export class UserAuthController {
    constructor(private readonly userService: UserAuthService) { }

    @Post()
    @ApiOperation({
        summary: 'create user',
        description: "create user for this project"
    })
    @ApiBody({
        type: CreateUserDto,
        required: true
    })
    createUser(
        @Body() createUserDto: CreateUserDto
    ): string {
        return this.userService.createUser();
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
    ): string {
        return this.userService.getUser(id);
    }

    @Get()
    @ApiOperation({
        summary: 'get all users',
        description: "get all users which are satisfying the condition"
    })
    allUsers(
        @Query() queryDto: QueryDto
    ): string {
        return this.userService.getAllUsers();
    }
}