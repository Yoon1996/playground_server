import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: '547260571734-5sq5ek3abubp24uhjl51d69895jojp89.apps.googleusercontent.com',
            // clientID: process.env.OAUTH_GOOGLE_ID,
            clientSecret: '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',
            // clientSecret: process.env.OAUTH_GOOGLE_SECRET,
            callbackURL: 'http://localhost:3000/auth/redirect',
            // callbackURL: process.env.OAUTH_GOOGLE_REDIRECT,
            scope: ['email', 'profile'],
        })
    }

    async validate(
        accessToken: string,
        profile: Profile,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails } = profile
        const user = {
            email: emails[0].value,
            name: name.givenName,
            accessToken,
        }
        done(null, user)
    }
}