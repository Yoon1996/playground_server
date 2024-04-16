import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private authService: AuthService, private userService: UserService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        //URL 정규식 검사
        //token 이 없어도 통신할 수 있는 URL return true  보내기
        const url = request.url
        const loginRegex = /\/auth\/login$/;
        const socialRegex = /\/auth\/social-login$/;
        const registRegex = /\/user\/regist$/
        const regexList = [loginRegex, socialRegex, registRegex]
        if (regexList.map((regex) => regex.test(url))) {
            return true
        }
        const token = this.extractTokenFromHeader(request)
        if (!token) {

            throw new UnauthorizedException()
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.ACCESS_TOKEN_SECRET_KEY
                }
            );
            request.user = payload;
        } catch {
            throw new UnauthorizedException()
        }
        const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: process.env.ACCESS_TOKEN_SECRET_KEY
            }
        )
        const user = await this.userService.findOneByEmail(payload.email)
        const jwt = this.authService.getAccessToken({ user })
        const { password, ...userWithoutPassword } = user;
        const userInfo = { ...userWithoutPassword, jwt }
        request.userInfo = userInfo
        return true
    }


    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined
    }
}