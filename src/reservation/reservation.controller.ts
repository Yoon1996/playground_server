import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateReservationDto } from './reservation.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
    constructor(
        private reserveService: ReservationService,
        private authService: AuthService
    ) { }

    @Post("/create_reservation")
    async create(@Body() CreateReservationDto: CreateReservationDto) {
        console.log('CreateReservationDto: ', CreateReservationDto);
        return this.reserveService.create(CreateReservationDto)
    }

    @Get("/get_reservation/:id")
    async get(@Param('id') id: number) {
        return await this.reserveService.get(id)
    }

    @Delete("/delete_reservation/:gymId")
    async deleteReservation(@Param('gymId') param: any, @Req() req: any) {
        try {
            if (!req.userInfo) {
                throw new NotFoundException
            }
            return await this.reserveService.deleteReservation(param)
        }
        catch (err) {
            console.log('err: ', err);
        }
    }
}
