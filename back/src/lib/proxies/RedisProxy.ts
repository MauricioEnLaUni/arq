import ERRORS from "../errors/Catalog.js";
import { TResult, Result } from "../utils/Result.js";
import IDataProvider from "../Abstractions/IDataProvider.js";
import RedisAccess from "../infrastructure/RedisAccess.js";
import IRecord from "../Abstractions/IRecord.js";

class RedisProxy implements IDataProvider
{
    private db? = RedisAccess.getClient();

    private readonly needsConnection = new Set(["upsert", "rm", "read"]);

    constructor () 
    {
        const handler: ProxyHandler<RedisProxy> = {
            get: (target, prop) => {
                const og = target[prop];
                if (typeof og === 'function') {
                    if (this.connects(prop)) {
                        return function (...args: any[]) {
                            this.connect();
                            return og.apply(this, args);
                        };
                    }
                }
                return og;
            }
        };
        const proxy = new Proxy(this, handler);
        return proxy;
    }

    read(): Promise<TResult> {
        throw new Error("Method not implemented.");
    }

    private connects(method: string | symbol)
    {
        if (typeof method === "symbol") return false;
        return this.needsConnection
            .has(method);
    }

    connect()
    {
        this.db = RedisAccess.getClient();
    }

    end()
    {
        this.db = undefined;
    }

    async getById(id: string): Promise<TResult> {
        const result = this.db.get(id);
        
        return result ? TResult.Success(result) : TResult.Failure(ERRORS.NOT_FOUND);
    }

    async upsert(data: IRecord): Promise<TResult> {
        const result = await this.db.set(data.id, data);

        return result ?
            TResult.Success(result) :
                TResult.Failure(ERRORS.UPDATE_FAILED);
    }

    async rm(id: string): Promise<Result> {
        const result = await this.db.del(id);

        return result
            ? Result.Success()
                : Result.Failure(ERRORS.UPDATE_FAILED);
    }
}

export default RedisProxy;