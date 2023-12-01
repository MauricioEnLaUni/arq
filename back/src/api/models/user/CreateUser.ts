import ERRORS from "../../../lib/errors/Catalog.js";
import HTTP_ERROR from "../../../lib/errors/HTTPError.js";
import User from "../../../lib/infrastructure/persistence/Repository/UsuarioRepository/User.js";
import RedisProxy from "../../../lib/proxies/RedisProxy.js";
import { TResult } from "../../../lib/utils/Result.js";

class UserIsUnique
{
    constructor(
        private state: User) { }

    async execute(): Promise<TResult>
    {
        const db = new RedisProxy();
        const { username: id, password } = this.state;

        return await db.upsert({ id, data: { password }});
    }

    async undo(): Promise<TResult>
    {
        const db = new RedisProxy();
        const result = await db.rm(this.state.username);
        
        return result.isSuccess ? TResult.Success(undefined) : TResult.Failure(ERRORS.UPDATE_FAILED);
    }
}

export default UserIsUnique;
