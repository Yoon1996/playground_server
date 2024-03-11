import { Controller, Get, Query } from '@nestjs/common';
import { GymService } from './gym.service';

@Controller('gym')
export class GymController {
    constructor(
        private gymService: GymService
    ) { }

    //모든 gymlist 보여주기
    @Get('all')
    findAll() {
        return this.gymService.findAll()
    }

    //전체 gymList의 길이
    @Get('getGymsLength')
    async getGymsLength() {
        const gymsLength = await this.gymService.gymListhLength();
        return gymsLength
    }

    //gymList 페이지네이트 해주기 12개
    @Get('gyms')
    async paginate(@Query('page') page: number) {
        const paginateGyms = await this.gymService.paginate(page)
        return paginateGyms
    }

    @Get('gyms')
    async search(@Query('search') search: string) {
        return this.gymService.search(search)
    }
}
