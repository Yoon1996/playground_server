import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { loginUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private userService: UserService,
        private readonly httpService: HttpService,) { }

    //토큰인증
    @Get('token-verify')
    async tokenVerify(@Req() req: any) {
        return this.authService.tokenVerify(req)
    }
    //로그인
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() input: loginUserDto,) {
        const { email, password } = input;
        return this.authService.login(email, password)
    }

    //소셜 로그인
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
