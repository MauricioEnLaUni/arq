import { IRecord } from "../../lib/infrastructure/persistence/DBFactory.js";
import { Result, TResult } from "../utils/Result.js";

interface IDataProvider
{
    connect(): void;
    end(): void;

    getById(id: string): Promise<TResult>;
    read(): Promise<TResult>;

    upsert(data: IRecord): Promise<TResult>;

    rm(id: string): Promise<Result>;
}

export default IDataProvider;