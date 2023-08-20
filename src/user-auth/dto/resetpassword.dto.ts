import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class resetPasswordDto {
    [key: string]: string | undefined;
    [key: symbol]: string | undefined;

    @ApiProperty({
        description: "email of the user",
        required: true
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

}
