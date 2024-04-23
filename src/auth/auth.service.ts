import { Injectable, Req, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Like, Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
        private userService: UserService,
    ) { }

    //토큰인증
    async tokenVerify(@Req() req: any) {
        try {
            if (!req?.headers?.authorization) throw new UnauthorizedException
            const tokenList = req.headers.authorization.split(' ')
            if (tokenList.length < 1) throw new UnauthorizedException
            const token = tokenList[1]
            const result = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.ACCESS_TOKEN_SECRET_KEY
                }
            );

            const user = await this.userService.findOneByEmail(result.email)
            const jwt = this.getAccessToken({ user })
            const { password, ...userWithoutPassword } = user;
            const userInfo = { ...userWithoutPassword, jwt }
            req.userInfo = userInfo
            return userInfo
        }
        catch (err) {
            if (err.message === 'jwt expired') {
                throw new Error('JWT_EXPIRED')
            } else if (err.message === 'jwt malformed') {
                throw new Error('JWT_MALFORMED')
            } else {
                throw new Error('INTERNAL_SERVER_ERROR')
            }
        }
    }

    //로그인
    async login(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email)
        if (!user) {
            throw new UnprocessableEntityException('이메일이 없습니다.')
        }

        const isAuth = await bcrypt.compare(password, user.password)
        if (!isAuth) {
            throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.')
        }
        const jwt = this.getAccessToken({ user })
        const { password: dummy, ...userWithoutPassword } = user;
        const userInfo = { ...userWithoutPassword, jwt }
        // console.log('userInfo: ', userInfo);
        // console.log('dummy: ', dummy);
        return userInfo

    }
    //Access Token 발급
    getAccessToken({ user }): string {
        return this.jwtService.sign(
            {
                email: user.email,
                sub: user.id
            },
            {
                secret: process.env.ACCESS_TOKEN_SECRET_KEY,
                expiresIn: '1d'
            }
        )
    }

    //소셜로그인
    async googleLogin(@Req() req: any): Promise<any> {
        const GOOGLE_ID = process.env.CLIENT_ID
        const GOOGLE_SECRET_KEY = process.env.SECRET_KEY
        try {
            const client = new OAuth2Client(GOOGLE_ID, GOOGLE_SECRET_KEY, "postmessage");
            const data = await client.getToken(req.body.code)
            const token = await client.verifyIdToken({ idToken: data.tokens.id_token })
            const payload = token.getPayload()
            const gmail = payload.email
            const gname = payload.name

            //이메일 provider === "email"
            const userByEmail = await this.userRepo.findOne({
                where: { email: gmail, provider: Like("%email%") }
            })
            //이메일 provider === "google"
            const userByGoogle = await this.userRepo.findOne({
                where: { email: gmail, provider: "google" }
            })

            if (userByEmail) {
                userByEmail.provider = "email, google"
                await this.userRepo.save(userByEmail)
            } else if (userByGoogle) {
            } else {
                const newUser = {
                    email: gmail,
                    password: null,
                    name: gname,
                    sex: null,
                    birth: null,
                    phoneNumber: null,
                    provider: "google",
                    withDraw: false,
                }
                await this.userService.createUser(newUser)
            }

            const user = await this.userService.findOneByEmail(gmail)
            const jwt = this.getAccessToken({ user })
            const { password: dummy, ...userWithoutPassword } = user;
            const userInfo = { ...userWithoutPassword, jwt }
            return userInfo
        }
        catch (err) {
            console.log('err: ', err);
        }
    }




    // googleLogin(req) {
    //     if (!req.user) {
    //         return 'No user from google'
    //     }

    //     return {
    //         message: 'User information from google',
    //         user: req.user
    //     }
    // }

    //Access Token 인증


    // setRefreshToken({ user }) {
    //     const refreshToken = this.jwtService.sign({
    //         email: user.email,
    //         sub: user.id,
    //     },
    //         {
    //             // secret: this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
    //             secret: process.env.REFRESH_TOKEN_SECRET_KEY,
    //             expiresIn: '2w',
    //         },
    //     );

    //     return refreshToken
    // }
}


