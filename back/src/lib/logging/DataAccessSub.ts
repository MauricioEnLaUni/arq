import crypto, { createHash } from "node:crypto";

import IObserver from "../Abstractions/IObserver.js";
import PgAccess from "../infrastructure/PgAccess.js";
import DatabaseTracker from "./DatabaseTracker.js";

class DataAccessObserver implements IObserver
{
    update(): void {
        DatabaseTracker.call("POKEMON", PgAccess.getClient());
    }

    hash()
    {
        return createHash("sha256")
            .update(Buffer.from(JSON.stringify(this)))
            .digest();
    }
}

export default DataAccessObserver;
