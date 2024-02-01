import { Body, ConflictException, Controller, Get, Logger, Param, Post, Put, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get('/all')
    findAll() {
        const dd = this.userService.findAll()
        return dd
    }

    @Post('/regist')
    async createUser(@Body() CreateUserDto: CreateUserDto) {
        const { email, password, sex, name, birth, phoneNumber } = CreateUserDto
        const alreadyUser = await this.userService.findOneByEmail(CreateUserDto.email)
        if (alreadyUser) {
            throw new ConflictException('DUPLICATED_EMAIL')
        }
        try {
            const hashPassword = await this.userService.hashPassword(CreateUserDto.password)
            CreateUserDto.password = hashPassword
            this.userService.createUser(CreateUserDto)
        }
        catch (error) {
            console.log('error: ', error);
        }
    }

    //소셜 로그인 추가 정보 입력
    @Put('/add-profile')
    async addProfile(@Body() profile: UpdateUserDto) {
        return this.userService.addProfile(profile)
    }

    //연락처 변경
    @Put('/change-profile/:id')
    async changeProfile(@Body() profile: UpdateUserDto, @Param() id: number) {
        return this.userService.changeProfile(profile, id)
    }
}
