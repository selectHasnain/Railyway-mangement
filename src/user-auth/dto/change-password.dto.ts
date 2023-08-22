import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordDto {
    [key: string]: string | undefined;
    [key: symbol]: string | undefined;

    @ApiProperty({
        description: "old password of the user",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    oldPassword: string;

    @ApiProperty({
        description: " new password of the user",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    newPassword: string;
}