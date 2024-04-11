import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";
import { IReservationModel } from "src/model/reservation.model";

export class CreateReservationDto implements Omit<IReservationModel, "id" | "createdAt" | "updatedAt"> {
    @IsInt()
    userId: number;

    @IsInt()
    gymId: number;

    @IsString()
    locationName: string;

    @IsDateString()
    date: Date;

    @IsString()
    people: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    time: string;

    @IsString()
    price: string;

    @IsOptional()
    @IsString()
    paymentMethod: string;
} 