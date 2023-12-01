import { Result } from "../../../../utils/Result.js";
import { IDbProxy } from "../../DatabaseProxy/IDbProxy.js";

export interface ICommand
{
    execute(db: IDbProxy, ctx?: unknown): Promise<Result>;

    undo(db: IDbProxy): Promise<Result>;
};
