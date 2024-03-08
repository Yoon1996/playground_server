import { Controller, Get, Query } from '@nestjs/common';
import { GymService } from './gym.service';

@Controller('gym')
export class GymController {
    constructor(
        private gymService: GymService
    ) { }

    @Get('all')
    findAll() {
        return this.gymService.findAll()
    }

    @Get('gyms')
    async paginate(@Query('page') page: number) {
        return this.gymService.paginate(page)
    }
}
