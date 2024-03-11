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
            return gyms
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
        // console.log(page)
        return gyms
    }

    //gym 전체길이
    async gymListhLength(): Promise<any> {
        const gymsLength = (await this.gymRepo.find()).length
        return gymsLength
    }

    //검색어 입력해서 리스트 불러오기
    async search(search: string): Promise<any> {
        const filteredGyms = await this.gymRepo.find({
            where: {

            }
        })
        return search
    }
}
