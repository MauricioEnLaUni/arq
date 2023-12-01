import { pokemon } from "@prisma/client";
import { IDbProxy } from "../../../lib/infrastructure/persistence/DatabaseProxy/IDbProxy.js";
import { ICommand } from "../../../lib/infrastructure/persistence/Repository/infrastructure/ICommand.js";
import { Result } from "../../../lib/utils/Result.js";
import { PgProxy } from "../../../lib/infrastructure/persistence/DatabaseProxy/Postgres/PgProxy.js";

class Catch implements ICommand
{
    async execute(db: PgProxy, ctx?: pokemon): Promise<Result> {
        
        return Result.Success();
    }
    undo(db: IDbProxy): Promise<Result> {
    }
    
}

export default Catch;