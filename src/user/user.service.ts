import { Body, Injectable, NotFoundException, Param, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto, changePwDto } from './user.dto';


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
    async changePhoneNumber(@Body() body: UpdateUserDto, @Param() param: any): Promise<any> {
        const { phoneNumber } = body
        const user = await this.userRepo.findOne({
            where: {
                id: param.id
            }
        })
        if (!user) {
            throw new NotFoundException('해당 user의 정보가 존재하지 않습니다.');
        }
        await this.userRepo.update(param.id, body)
        const updateUser = await this.userRepo.findOne({
            where: {
                id: param.id
            }
        })
        return updateUser
    }

    //생년월일 변경
    async changeBirth(@Body() body: UpdateUserDto, @Param() param: any): Promise<any> {
        const { birth } = body
        const user = await this.userRepo.findOne({
            where: {
                id: param.id
            }
        })
        if (!user) {
            throw new NotFoundException('해당 user의 정보가 존재하지 않습니다.');
        }
        await this.userRepo.update(param.id, body)
        const updateUser = await this.userRepo.findOne({
            where: {
                id: param.id
            }
        })
        return updateUser
    }

    //비밀번호 변경
    async changePw(@Body() body: changePwDto, @Param() param: any): Promise<any> {
        const user = await this.findOneById(param.id)
        const isAuth = await bcrypt.compare(body.oldPassword, user.password)
        const { password } = body
        console.log('password: ', password);
        if (!isAuth) throw new UnprocessableEntityException('현재 비밀번호가 일치하지 않습니다.')
        if (body.oldPassword === body.password) throw new UnprocessableEntityException('새 비밀번호는 현재 비밀번호와 일치하면 안됩니다.')
        if (body.password !== body.newPassword) throw new UnprocessableEntityException('입력하신 새 비밀번호가 일치 하지 않습니다.')
        const newPassword = await this.hashPassword(password)
        console.log('newPassword: ', newPassword);
        await this.userRepo.update(param.id, { password: newPassword })
        return '비밀번호 변경 완료'
    }
}
