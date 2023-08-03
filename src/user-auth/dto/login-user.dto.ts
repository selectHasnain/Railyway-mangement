import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    [key: string]: string | undefined;
    [key: symbol]: string | undefined;

    @ApiProperty({
        description: "email of the student",
        required: true
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "password of the student",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}