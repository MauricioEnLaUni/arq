import ERRORS from "../../../lib/errors/Catalog.js";
import HTTP_ERROR from "../../../lib/errors/HTTPError.js";
import User from "../../../lib/infrastructure/persistence/Repository/UsuarioRepository/User.js";
import RedisProxy from "../../../lib/proxies/RedisProxy.js";
import { TResult } from "../../../lib/utils/Result.js";

class UserIsUnique
{
    constructor(
        private state: string) { }

    async execute(): Promise<TResult>
    {
        const db = new RedisProxy();
        const usr = await db.getById(this.state);

        return !!usr ? TResult.Failure(HTTP_ERROR[409])
            : TResult.Success(undefined);
    }

    async undo(): Promise<TResult>
    {
        return TResult.Failure(ERRORS.NOT_IMPLEMENTED);
    }
}

export default UserIsUnique;
