import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gym } from 'src/entity/gym.entity';
import { Like, Repository } from 'typeorm';
import { QueryDto } from './gym.dto';

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

    //gym filter
    async filter(query?: QueryDto): Promise<any> {
        const db = this.gymRepo
            .createQueryBuilder("gym")
            .take(12)
            .skip((query.page - 1) * 12)
        if (query.search) {
            db.andWhere({
                name: Like(`%${query.search}%`)
            })
        }
        if (query.region) {
            db.andWhere({
                name: Like(`%${query.region}%`)
            })
        }
        if (query.sportsType) {
            db.andWhere({
                sportsType: Like(`%${query.sportsType}%`)
            })
        }
        if (query.parkingInfo) {
            db.andWhere({
                parkingInfo: Like(`%${query.parkingInfo}%`)
            })
        }
        return { list: await db.getMany(), length: await db.getCount() }
    }

    //gym 카테고리 가져오기
    async category(): Promise<any> {
        try {
            const categories = await this.gymRepo.find({
                select: ['region', 'sportsType']
            })

            const categoryRegions = categories.map(category => category.region);
            const categorySportsType = categories.map(category => category.sportsType);

            //배열 중복 제거해주는 list 함수
            const setList = (list: string[]) => {
                return [...new Set(list)].sort();
            };
            return { region: setList(categoryRegions), sportsType: setList(categorySportsType) }
        }
        catch (err) {
            console.log('err: ', err);
        }
    }
}
