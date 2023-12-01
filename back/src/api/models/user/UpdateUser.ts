import { ICommand } from "../../../lib/Abstractions/ICommand.js";
import ERRORS from "../../../lib/errors/Catalog.js";
import HTTP_ERROR from "../../../lib/errors/HTTPError.js";
import User from "../../../lib/infrastructure/persistence/Repository/UsuarioRepository/User.js";
import PgProxy from "../../../lib/proxies/PgProxy.js";
import RedisProxy from "../../../lib/proxies/RedisProxy.js";
import { TResult } from "../../../lib/utils/Result.js";

class UpdateUser implements ICommand
{
    constructor(
        private state: User
    ) {  }

    async execute(): Promise<TResult> {
        const r = new RedisProxy();
        const p = new PgProxy("USERS");
        const d = { id: this.state.id, data: this.state.data };

        const exists = await Promise.all([
            r.getById(d.id),
            p.getById(d.id)
        ]);

        if (exists[0].isFailure() && exists[1].isFailure()) {
            this.undo();
            return TResult.Failure(HTTP_ERROR[409]);
        }

        const results = await Promise.all([
            r.upsert(d),
            p.upsert(d),
        ]);

        const result = results.some(e => e.isFailure());
        if (result) {
            this.undo();
            TResult.Failure(ERRORS.UPDATE_FAILED);
        }

        return TResult.Success(undefined);
    }
    async undo(): Promise<TResult> {
        const r = new RedisProxy();
        const p = new PgProxy("USERS");
        const d = this.state;
        
        r.rm(d.id);
        p.rm(d.id);

        return TResult.Success(`Deleted record: ${ d.id }`);
    }
    
}

export default UpdateUser;
