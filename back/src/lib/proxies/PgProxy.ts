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
        USERS: () => PgAccess.getClient().usuarios,
        POKEMON: () => PgAccess.getClient().pokemon,
        BOXES: () => PgAccess.getClient().box,
        PARTY: () => PgAccess.getClient().party,
        BOX_SLOT: () => PgAccess.getClient().box_slot,
        PARTY_SLOT: () => PgAccess.getClient().party_slot,
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

    async getById(value: any): Promise<TResult> {
        const target = await this.repo.findUnique({ where: { ... value } });
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

    async upsert(data: any): Promise<TResult> {
        const { id, data: value } = data;
        const result = await this.repo.upsert({
            where: id,
            create: {
                ... value,
            },
            update: {
                ... value,
            },
        });

        return TResult.Success(result);
    }

    async rm(id: string): Promise<Result> {
        const result = await this.repo.delete({ where: { id }});

        return result
            ? Result.Success()
                : Result.Failure(ERRORS.UPDATE_FAILED);
    }
}

export default PgProxy;
