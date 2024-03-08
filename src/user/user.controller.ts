import { Body, ConflictException, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, changePwDto } from './user.dto';
import { UserService } from './user.service';

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
    @Put('/change-phoneNumber/:id')
    async changeProfile(@Body() profile: UpdateUserDto, @Param() id: number) {
        return this.userService.changePhoneNumber(profile, id)
    }

    //생년월일 변경
    @Put('/change-birth/:id')
    async changeBirth(@Body() profile: UpdateUserDto, @Param() id: number) {
        return this.userService.changeBirth(profile, id)
    }

    //비밀번호 변경
    @Put('/change-pw/:id')
    async changePw(@Body() profile: changePwDto, @Param() id: number) {
        return this.userService.changePw(profile, id)
    }
}
