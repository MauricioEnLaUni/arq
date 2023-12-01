import crypto from "crypto";

import ERRORS from "../../../lib/errors/Catalog.js";
import HTTP_ERROR from "../../../lib/errors/HTTPError.js";
import User from "../../../lib/infrastructure/persistence/Repository/UsuarioRepository/User.js";
import RedisProxy from "../../../lib/proxies/RedisProxy.js";
import { TResult } from "../../../lib/utils/Result.js";

class HashPassword
{
    constructor(
        private state: string) { }

    async execute(): Promise<TResult>
    {
        return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16);

        crypto.scrypt(this.state, salt, 32, (err, derivedKey) => {
            if (err) {
                reject(err);
            }
            resolve(TResult.Success(`${salt.toString("hex")}:${derivedKey.toString("hex")}`));
        });
    });
    }

    async undo(): Promise<TResult>
    {
        return TResult.Success(this.state);
    }
}

export default HashPassword;
