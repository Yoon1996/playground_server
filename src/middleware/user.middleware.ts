import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class UserInfoMiddleware implements NestMiddleware {
    use(req: Request, next: NextFunction) {
        console.log("request....");
        next();
    }
}