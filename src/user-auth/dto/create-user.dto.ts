import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: "first name of the user",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({
        description: "last name of the user",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty({
        description: "phone number of the user",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({
        description: "email of the user",
        required: true
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "password of the user",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}