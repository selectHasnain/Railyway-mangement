import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsEmpty, IsString } from "class-validator";

export class QueryDto {
    @ApiProperty({
        description: "page no of the website",
        required: false
    })
    @IsEmpty()
    @IsNumber()
    page: number;

    @ApiProperty({
        description: "number of records to take from database",
        required: false
    })
    @IsEmpty()
    @IsNumber()
    take: number;

    @ApiProperty({
        description: "keyword to search from database",
        required: false
    })
    @IsEmpty()
    @IsString()
    keyword: string;
}