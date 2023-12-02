import ERRORS from "../../lib/errors/Catalog.js";
import PgProxy from "../proxies/PgProxy.js";
import RedisProxy from "../proxies/RedisProxy.js";
import { asDbCatalog } from "../infrastructure/DatabaseCatalog.js";

class DatabaseFactory
{
    constructor() { }

    private static readonly values = {
        DEFAULT: () => ERRORS.VALUE_OUT_RANGE,
        USER: () => new RedisProxy(),
        POKEMON: () => new PgProxy("POKEMON"),
    }

    static access(table: string)
    {
        const key = asDbCatalog(table);

        return DatabaseFactory.values[key];
    }
}

export default DatabaseFactory;
