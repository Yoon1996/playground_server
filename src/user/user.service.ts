import { Body, Injectable, Param, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) {

    }
    //유저 전체 조회
    async findAll(): Promise<User[]> {
        try {
            const users = await this.userRepo.find();
            return users;
        }
        catch (error) {
            console.log(error)
        }
    }

    //id 로 유저 조회
    async findOneById(id: number) {
        const user = await this.userRepo.findOne({
            where: { id: id }
        })
        return user
    }

    //동일 이메일 검사
    async findOneByEmail(email: string) {
        const user = await this.userRepo.findOne({
            where: { email: email }
        })
        return user
    }

    //비밀번호 암호화
    async hashPassword(password: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    //유저 회원가입
    async createUser(createUserDto: CreateUserDto) {
        const user = this.userRepo.create(createUserDto);
        return await this.userRepo.save(user);
    }

    //소셜로그인(유저 정보 추가 입력)
    async addProfile(@Body() profile: UpdateUserDto): Promise<any> {
        const { id, birth, sex, phoneNumber } = profile
        const user = this.findOneById(id);
        (await user).birth = birth;
        (await user).sex = sex;
        (await user).phoneNumber = phoneNumber
        await this.userRepo.save(profile)
        return user
    }

    //연락처 변경
    async changeProfile(@Body() body: UpdateUserDto, @Param() param: any): Promise<any> {
        const { phoneNumber, birth, password } = body
        const user = await this.findOneById(param.id)
        console.log('user: ', user);
        if (phoneNumber) {
            user.phoneNumber = phoneNumber
            await this.userRepo.save(body)
        } else if (birth) {
            console.log("birth 있다")
        } else if (password) {
            console.log("비번이다")
        }
        return body
    }
}
