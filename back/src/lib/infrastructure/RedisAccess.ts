import { Redis } from "@upstash/redis";

import DBEmitter from "../utils/dbEmitter.js";
import DbTracker from "../logging/DatabaseTracker.js";
import { DatabaseCatalog } from "./DatabaseCatalog.js";

class RedisAccess
{
    private static client: Redis;

    private static emitter: DBEmitter;
    
    private constructor() {}

    static getClient()
    {
        if (!RedisAccess.client)
        {
            RedisAccess.client = new Redis({
                url: process.env.AUTH,
                token: process.env.AUTH_TOKEN
            });
        }

        if (!RedisAccess.emitter)
        {
            RedisAccess.emitter = new DBEmitter();
            RedisAccess.emitter.on("call", (repo: DatabaseCatalog, client: Redis) => {
                DbTracker.call(repo, client);
            });
        }

        RedisAccess.emitter.emit("call", "TOKEN", RedisAccess.client);

        return RedisAccess.client;
    }
}

export default RedisAccess;