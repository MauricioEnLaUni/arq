import { PrismaClient, box, box_slot, usuarios } from "@prisma/client";

import { IDbProxy } from "../IDbProxy.js";
import { Result, TResult } from "../../../../utils/Result.js";

class PgSingleton
{
    private static client: PrismaClient;

    private constructor() { }

    static getInstance()
    {
        if (!PgSingleton.client) {
            PgSingleton.client = new PrismaClient();
        }

        return PgSingleton.client;
    }
}

export class PgProxy implements IDbProxy
{
    private readonly db: PrismaClient;

    private readonly tables = new Set([
        "usuarios",
        "pokemon",
    ]);

    private readonly repos = new Map<string, any>([]);

    private readonly aggregates = new Map<string, any>([
        [
            "usuarios",
            (data: usuarios) => {
                const { id } = data;
                const six = Array(6).fill(undefined);

                return {
                    where: { id },
                    create: {
                        ... data,
                        party: {
                            create: [{
                                slot: {
                                    createMany: six.map((_, i) => ({ slot: i + 1, pokemonId: null }))
                            }}],
                        },
                        boxes: {
                            create: {
                                number: 1,
                                slot: {
                                    create: {
                                        number: 1
                                    }
                                }
                            }
                        }
                    },
                    update: {
                        ... data
                    }
                }
            }
        ],
        [
            "boxes",
            (data: box, usuario: usuarios) => {
                const { id } = data;
                return {
                    where: { id },
                    create: {
                        number: data.number,
                        usuarios: {
                            connect: {
                                id: usuario.id
                            }
                        },
                        slot: {
                            create: {
                                number: 1,
                                pokemonId: null,
                            }
                        }
                    },
                    update: {
                        ... data,
                    }
                }
            }
        ],
        [
            "box_slot",
            (data: box_slot) => {
                const { id } = data;
                return {
                    
                }
            }
        ]
    ]);

    constructor()
    {
        this.db = PgSingleton.getInstance();
        this.tables.forEach(table => {
            this.repos.set(table, this.db[table]);
        });
    }
    
    async connect() { }

    async end() { }

    async upsert(data: any)
    {
        const { table, values } = data;
        const repo = this.repos.get(table)!;
        const aggregate = this.aggregates.get(table);

        await repo.upsert(aggregate({ ... values }));

        return Result.Success();
    }

    async rm(id: string, table: string)
    {
        const repo = this.repos.get(table)!;
        await repo.delete({ where: { id } });

        return Result.Success();
    }

    async read(filter: any)
    {
        const { table } = filter;
        const repo = this.repos.get(table)!;
        const result = await repo.findMany({ ... filter });

        return TResult.Success(result);
    }

    async single(id: string, table: string)
    {
        const repo = this.repos.get(table)!;
        const result = await repo.findFirst({ where: { id } });

        return TResult.Success(result);
    }
}
