import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryDto } from './gym.dto';
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

    //gymList 페이지네이트 해주기 12개
    @Get('gyms')
    async filter(@Query() query?: QueryDto) {
        const gyms = await this.gymService.filter(query)
        return gyms
    }

    //카테고리 리스트 가져오기
    @Get('category')
    async category() {
        return await this.gymService.category()
    }

    //gym detail 글 가져오기
    @Get('gym_detail/:id')
    async gymDetail(@Param('id') id: number) {
        return await this.gymService.gymDetail(id)
    }
}
