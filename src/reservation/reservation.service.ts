import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { Reservation } from 'src/entity/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './reservation.dto';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private reserveRepo: Repository<Reservation>,
    ) {

    }

    //예약하기
    async create(create: CreateReservationDto) {
        const reservation = this.reserveRepo.create(create)
        return await this.reserveRepo.save(reservation)
    }

    //예약 정보 가져오기
    async get(id: number): Promise<any> {
        console.log(id)
        try {
            const userReservation = await this.reserveRepo.find({
                where: {
                    userId: id
                }
            })
            console.log('userReservation: ', userReservation[0].date);
            return userReservation
        }
        catch (err) {
            console.log('err: ', err);
        }
    }

    //예약 내역 삭제하기
    async deleteReservation(id: number): Promise<any> {
        try {
            const result = this.reserveRepo.delete(id)
            console.log('result: ', result);
        }
        catch (err) {
            console.log('err: ', err);

        }
    }

    async canNotReservation(date: Date): Promise<any> {
        const dateString = format(new Date(date), "yy-mm-dd")
        console.log('dateString: ', dateString);
        try {
            const dd = this.reserveRepo.createQueryBuilder("reservation")
                .where({ date: date })
                .getMany()
            return dd
        }
        catch (err) {
            console.log('err: ', err);
        }
    }
}
