import { Result, TResult } from "../utils/Result.js";
import IRecord from "./IRecord.js";

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