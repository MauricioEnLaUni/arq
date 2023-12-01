import { Result, TResult } from "../../../utils/Result.js";
import { IEntity } from "./IEntity.js";

export interface IDbProxy
{
    connect();

    end();

    upsert(data: IEntity, filter?: unknown): Promise<Result>;

    rm(id: string, table?: string): Promise<Result>;

    read(filter: unknown): Promise<TResult>;

    single(id: string, filter?: unknown): Promise<TResult>;
};
