import crypto, { timingSafeEqual } from "crypto";

import User from "../User.js";
import ERRORS from "../../../../lib/errors/Catalog.js";
import PgProxy from "../../../../lib/proxies/PgProxy.js";
import { TResult } from "../../../../lib/utils/Result.js";
import HTTP_ERROR from "../../../../lib/errors/HTTPError.js";
import AUTH_ERROR from "../../../../lib/errors/AuthError.js";
import RedisProxy from "../../../../lib/proxies/RedisProxy.js";

class UserHandler
{
    public current: User | undefined;

    get id() { return this.current.username; };

    public async LoadUser(id: string, p = new PgProxy("USERS"))
    {
        const result = await p.getById({ username: id });

        this.current = result.value as User;

        return result;
    }

    public async UsernameAvailable(id: string, p = new PgProxy("USERS"))
    {
        const result = await p.getById({ username: id });
        
        if (result.isSuccess()) {
            return TResult.Failure(AUTH_ERROR.CONFLICT);
        }

        this.current = new User();
        this.current.username = id;
        this.current.active = true;

        return TResult.Success(true);
    }

    public async ClearUser()
    {
        const result = TResult.Success(this.current);
        this.current = undefined;

        return result;
    }

    public async Hash(clearText: string)
    {
        const hash = await new Promise((resolve, reject) => {
            const salt = crypto.randomBytes(16);
    
            crypto.scrypt(clearText, salt, 32, (err, derivedKey) => {
                if (err) {
                    reject(err);
                }
                resolve(`${salt.toString("hex")}:${derivedKey.toString("hex")}`);
            });
        });

        this.current.password = hash as string;

        return TResult.Success(hash);
    }

    public async UpdateUser(data: unknown, p: PgProxy = new PgProxy("USERS"))
    {
        const newUser = data as User;

        if (this.id !== newUser.id) return TResult.Failure(HTTP_ERROR[409]);

        const finds = await Promise.all([
            p.getById(this.current.id),
            p.getById(newUser.id)
        ]);

        if (finds[0].isFailure()) return finds[0]
        if (finds[1].isSuccess()) return TResult.Failure(HTTP_ERROR[409]);
        
        return await p.upsert({ id: newUser.id, data: newUser.data });
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
    
    public async CreateUser(p: PgProxy = new PgProxy("USERS"), r = new RedisProxy())
    {
        const { username, password } = this.current;
        
        const inserts = await Promise.all([
            p.upsert({
                id: { username },
                data: {
                    username,
                    password,
                    status: "ACTIVE",
                }
            }),
            r.upsert({
                id: username,
                data: {
                    username,
                    password,
                    active: true,
                    accessToken: undefined,
                    refreshToken: undefined,
                }
            })
        ]);

        const results = inserts.some(e => e.isFailure());
        if (results) {
            this.RemoveUser(username);
            return TResult.Failure(ERRORS.UPDATE_FAILED);
        }

        return TResult.Success({
            username,
        });
    }

    public async RemoveUser(username: string, p = new PgProxy("USERS"), r = new RedisProxy())
    {
        const rms = await Promise.all([
            p.rm(username),
            r.rm(username),
        ]);
        const results = rms.some(e => e.isFailure);
        if (!results) return TResult.Failure(ERRORS.UPDATE_FAILED);

        return TResult.Success(`Removed user ${ username }`);
    }
}

export default UserHandler;
