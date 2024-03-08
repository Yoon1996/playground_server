import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gym } from 'src/entity/gym.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GymService {
    constructor(
        @InjectRepository(Gym)
        private gymRepo: Repository<Gym>
    ) {
    }

    //gym 전체 정보 조회
    async findAll(): Promise<any> {
        try {
            const gyms = await this.gymRepo.find()
            return gyms.length
        }
        catch (err) {
            console.log('err: ', err);
        }
    }

    //페이지네이션
    async paginate(page: number): Promise<any> {
        const gyms = await this.gymRepo.find({
            take: 12,
            skip: (page - 1) * 12
        })
        console.log(page)
        return gyms
    }
}
