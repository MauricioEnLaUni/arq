import { PrismaClient } from "@prisma/client";

import PgSubject from "../models/PgSubject.js";
import { DatabaseCatalog, asDbCatalog } from "../infrastructure/DatabaseCatalog.js";
import RedisSubject from "../models/RedisSubject.js";
import { Redis } from "@upstash/redis";

class DatabaseTracker
{
    private static pgTracker: PgSubject;

    private static redisTracker: RedisSubject;

    public static track(action: string, client: unknown)
    {
        const key = asDbCatalog(action);
        if (key === "DEFAULT") return;

        DatabaseTracker.call(key, client);
    }

    static call(action: DatabaseCatalog, client: unknown)
    {
        if (action === "POKEMON") {
            if (!DatabaseTracker.pgTracker)
            {
                DatabaseTracker.pgTracker = new PgSubject();
            }

            DatabaseTracker.pgTracker.call(client as PrismaClient);

            console.log(`La base de datos de postgresql se ha llamado: ${this.pgTracker.calls} veces`);
            console.log(`Este método ha creado: ${ this.pgTracker.created } clientes`);
        }
        if (action === "USER") {
            if (!DatabaseTracker.redisTracker)
            {
                DatabaseTracker.redisTracker = new RedisSubject();
            }

            console.log(`La base de datos de postgresql se ha llamado: ${this.redisTracker.calls} veces`);
            console.log(`Este método ha creado: ${ this.redisTracker.created } clientes`);
            DatabaseTracker.redisTracker.call(client as Redis);
        }
    }
}

export default DatabaseTracker;
