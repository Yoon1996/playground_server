import { IsDate, IsDateString, IsEnum, IsNumber, IsOptional, IsString, isString } from "class-validator";
import { sexType } from "src/entity/user.entity";
import { IUserModel } from "src/model/user.model";

export class CreateUserDto implements Omit<IUserModel, "id" | "createdAt" | "updatedAt" | "withDraw"> {
    @IsString()
    name: string

    @IsString()
    email: string

    @IsString()
    password: string

    @IsEnum(sexType)
    sex: sexType;

    @IsString()
    phoneNumber: string;

    @IsDateString()
    birth: Date;

    @IsString()
    provider: string;
}
export class UpdateUserDto implements Partial<IUserModel> {

    @IsNumber()
    @IsOptional()
    id?: number

    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    password?: string

    @IsEnum(sexType)
    @IsOptional()
    sex?: sexType;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsDateString()
    @IsOptional()
    birth?: Date

    @IsString()
    @IsOptional()
    provider?: string;
}

export class loginUserDto {

    @IsString()
    email: string

    @IsString()
    password: string
}