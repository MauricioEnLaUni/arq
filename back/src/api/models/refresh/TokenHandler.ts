import crypto, { timingSafeEqual } from "crypto";
import jwt from "jsonwebtoken";

import { TResult } from "../../../lib/utils/Result.js";
import RedisProxy from "../../../lib/proxies/RedisProxy.js";
import User from "../user/User.js";
import AUTH_ERROR from "../../../lib/errors/AuthError.js";
import Token from "./Token.js";

class TokenHandler
{
    public current: User;

    public username: string;

    public async LoadUser(user?: string, r = new RedisProxy())
    {
        const id = user ?? this.username;
        const result = await r.getById(id);

        this.current = result.value as User;

        return result;
    }

    public async ClearUser()
    {
        const result = TResult.Success(this.current);
        this.current = undefined;

        return result;
    }
    
    public async CreateToken(r = new RedisProxy)
    {
        const { username } = this.current;
        const now = new Date().getTime();

        const accessToken = jwt.sign(
            {
                username, 
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" },
        );
        const refreshToken = jwt.sign(
            {
                username,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" },
        );

        const aT = {
            content: accessToken,
            expires: new Date(now + (15 * 60000))
        };

        const rT = {
            content: refreshToken,
            expires: new Date(now + (24 * 60 * 60 * 1000))
        };

        await r.upsert({ id: username, data: {
            ... this.current,
            accessToken: aT,
            refreshToken: rT,
        }});

        return TResult.Success({ accessToken: aT, refreshToken: rT });
    }

    public async VerifyJwt(r = new RedisProxy())
    {
        const { username, refreshToken } = this.current;

        return TResult.Success((res: any) => jwt.verify(refreshToken.content, process.env.REFRESH_TOKEN, (err, decoded) => {
            if (err || username !== decoded) {
                return TResult.Failure(AUTH_ERROR.UNAUTHORIZED);
            }
            
            const accessToken = jwt.sign(
                {
                    username, 
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" },
            );
            
            res.json({ accessToken });
        }));
    }

    public async Logout(r = new RedisProxy())
    {
        const usr = this.current;
        const { accessToken, refreshToken } = usr;
        
        if (!refreshToken && !accessToken) {
            return TResult.Success("Account has no tokens");
        }
        
        return await r.upsert({ id: usr.id, data: {
            ... usr,
            accessToken: undefined,
            refreshToken: undefined,
        }});
    }

    public async ExpireToken(r = new RedisProxy())
    {
        const { id, accessToken, refreshToken } = this.current;

        const now = new Date(Date.now());

        const actualRefresh = refreshToken.expires > now ? refreshToken
            : undefined;

        const actualAccess = actualRefresh && accessToken.expires > now
            ? accessToken : undefined;

            if (actualAccess === accessToken && actualRefresh === refreshToken)
            {
                return TResult.Success({ accessToken, actualRefresh });
            }
        
        await r.upsert({
            id,
            data: {
                ... this.current,
                accessToken: actualAccess,
                refreshToken: actualRefresh
            }
        });
        
        return TResult.Success({
            accessToken: actualAccess,
            refreshToken: actualRefresh
        });
    }
    
    public async VerifyPassword(clearText: string)
    {
        const hash = this.current.password;

        const result = await new Promise((resolve, reject) => {
            const [salt, key] = hash.split(":");
            const b = Buffer.from(key, "hex");
            crypto.scrypt(clearText, salt, 32, (err, derivedKey) => {
                if (err) {
                    reject(err);
                }
    
                resolve(timingSafeEqual(b, derivedKey));
            });
        });

        if (typeof result === "boolean") return TResult.Success(result);

        return TResult.Failure(AUTH_ERROR.WRONG_PASSWORD);
    }

    public async DecodeJwt(jwt: string)
    {
        const parts = jwt.split(".");
        const header = JSON.parse(Buffer.from(parts[0], "base64").toString());

        return TResult.Success(header.username);
    }
}

export default TokenHandler;
