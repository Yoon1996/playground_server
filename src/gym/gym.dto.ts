import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page: number

    @IsOptional()
    @Type(() => String)
    @IsString()
    search: string

    @IsOptional()
    @Type(() => String)
    @IsString()
    region: string

    @IsOptional()
    @Type(() => String)
    @IsString()
    sportsType: string

    @IsOptional()
    @Type(() => String)
    @IsString()
    parkingInfo: string

}