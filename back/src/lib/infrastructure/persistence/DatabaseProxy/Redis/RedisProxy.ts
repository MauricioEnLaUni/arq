import { Redis } from "@upstash/redis";

import { IDbProxy } from "../IDbProxy.js";
import { IEntity } from "../IEntity.js";
import { REDIS_ERRORS } from "./Errors.js";
import ERRORS from "../../../../errors/Catalog.js";
import { RedisFilter } from "./RedisFilter.js";
import { Result, TResult } from "../../../../utils/Result.js";

class RedisSingleton
{
    private static client: Redis;
    
    private constructor() { }

    static getInstance()
    {
        if (!RedisSingleton.client) {
            RedisSingleton.client = new Redis({
                url: process.env.AUTH,
                token: process.env.AUTH_TOKEN
            });
        }

        return RedisSingleton.client;
    }
}

export class RedisProxy implements IDbProxy
{
    private db?: Redis;

    private readonly needsConnection = new Set(["upsert", "rm", "read"]);

    constructor()
    {
        const handler: ProxyHandler<RedisProxy> = {
            get: (target, prop) => {
                const og = target[prop];
                if (typeof og === 'function') {
                    if (this.connects(prop)) {
                        return function (...args: any[]) {
                            this.connect();
                            return og.apply(this, args);
                        };
                    }
                }
                return og;
            }
        };
        const proxy = new Proxy(this, handler);
        return proxy;
    }

    private connects(method: string | symbol)
    {
        if (typeof method === "symbol") return false;
        return this.needsConnection
            .has(method);
    }

    connect()
    {
        this.db = RedisSingleton.getInstance();
    }

    end()
    {
        this.db = undefined;
    }

    async upsert(data: IEntity)
    {
        const { id, ... values } = data;
        const result = await this.db.set(data.id, values);
        if (result === "OK" ) return Result.Success();

        return Result.Failure(REDIS_ERRORS.CANT_SET);
    }

    async rm(id: string)
    {
        const result = await this.db.del(id);
        if (result === 0) {
            return Result.Failure(ERRORS.NOT_FOUND);
        }
        return Result.Success();
    }

    async read(filter: unknown)
    {
        const f = filter as RedisFilter;
        const result = await this.db.scan(f.count, { match: f.pattern });
        
        if (!result) {
            return TResult.Failure(REDIS_ERRORS.SCAN_FAILED);
        }
        
        return TResult.Success(result);
    }

    async single(id: string)
    {
        const result = await this.db.get(id);
        if (!result) {
            return TResult.Failure(ERRORS.NOT_FOUND);
        }

        return TResult.Success(result);
    }
}
