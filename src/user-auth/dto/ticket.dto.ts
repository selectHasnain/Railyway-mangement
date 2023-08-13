import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ticketDto {
    [key: string]: string | undefined;
    [key: symbol]: string | undefined;

    @ApiProperty({
        description: "status of the ticket",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiProperty({
        description: "Total passenger in  the ticket",
        required: true
    })
    @IsNotEmpty()
    @IsEmail()
    noOfPassenger: string;
    
    @ApiProperty({
        description: "date of the ticket",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    date: string;
}