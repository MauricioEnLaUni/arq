import ERRORS from "../errors/Catalog.js"
import IRecord from "../Abstractions/IRecord.js";
import { TResult, Result } from "../utils/Result.js";
import IDataProvider from "../Abstractions/IDataProvider.js";
import PgAccess from "../infrastructure/PgAccess.js";
import { asDbCatalog } from "../infrastructure/DatabaseCatalog.js";

class PgProxy implements IDataProvider
{
    private static readonly getRepo = {
        DEFAULT: () => undefined,
        OFFICE: () => PgAccess.getClient().usuarios,
        ROUTES: () => PgAccess.getClient().pokemon,
    } as const;

    private readonly repo: any;

    constructor (table: string) 
    {
        const key = asDbCatalog(table);
        if (key === "DEFAULT") return;
        
        this.repo = PgProxy.getRepo[key]();
    }

    connect(): void {
        PgAccess.getClient().$connect();
    }

    end(): void {
        PgAccess.getClient().$disconnect();
    }

    async getById(id: string): Promise<TResult> {
        const target = await this.repo.findUnique({ where: id });
        return target ?
            TResult.Success(target)
                : TResult.Failure(ERRORS.NOT_FOUND);
        
    }
    async read(): Promise<TResult> {
        const results = await this.repo.findMany();
        return results ?
            TResult.Success(results)
                : TResult.Failure(ERRORS.NO_RECORDS);
    }

    async upsert(data: IRecord): Promise<TResult> {
        const result = await this.repo.upsert(data);

        return result ?
            TResult.Success(result) :
                TResult.Failure(ERRORS.UPDATE_FAILED);
    }
    async rm(id: string): Promise<Result> {
        const result = await this.repo.delete({ where: { id }});

        return result
            ? Result.Success()
                : Result.Failure(ERRORS.UPDATE_FAILED);
    }
}

export default PgProxy;
