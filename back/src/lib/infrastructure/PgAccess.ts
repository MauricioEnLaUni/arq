import { PrismaClient } from "@prisma/client";
import DBEmitter from "../utils/dbEmitter.js";
import DatabaseTracker from "../logging/DatabaseTracker.js";

class PgAccess
{
    private static client: PrismaClient;

    private static emitter: DBEmitter;
    
    private constructor() {}

    public static getClient()
    {
        if (!PgAccess.client)
        {
            PgAccess.client = new PrismaClient();
        }

        if (!PgAccess.emitter)
        {
            PgAccess.emitter = new DBEmitter();
            PgAccess.emitter.on("call", (client: PrismaClient) => {
                DatabaseTracker.call("POKEMON", client);
            });
        }

        PgAccess.emitter.emit("call", PgAccess.client);
        return PgAccess.client;
    }
}

export default PgAccess;
