import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { loginUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { OAuth2Client } from 'google-auth-library';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService, private readonly httpService: HttpService) { }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() input: loginUserDto,) {
        const { email, password } = input;
        return this.authService.login(email, password)
    }

    @Post('/social-login')
    async googleLogin(@Body() body: any, @Req() req: any) {
        return this.authService.googleLogin(req)
    }
    //카카오 이메일 가져오기 불가
    // @HttpCode(HttpStatus.OK)
    // @Post('/kakao-login')
    // async kakaoLogin(@Body() body: any, @Req() request: any) {

    //     const { token } = body;
    //     const userInfoUrl = `https://kapi.kakao.com/v2/user/me`
    //     const userInfoHeaders = {
    //         Authorization: `Bearer ${token}`,
    //     };
    //     const { data } = await firstValueFrom(
    //         this.httpService.get(userInfoUrl, { headers: userInfoHeaders })
    //     )
    //     console.log('data: ', data);
    // }å
}
