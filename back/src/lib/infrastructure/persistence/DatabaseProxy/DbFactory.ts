import { RedisProxy } from "./Redis/RedisProxy.js";
import { IDbProxy } from "./IDbProxy.js";

const CATALOG = {
    DEFAULT: undefined,
    USER: undefined,
    TOKEN: new RedisProxy(),
    PACIENTE: undefined,
    CONSULTA: undefined,
    PERSONA: undefined,
    TIPO_ANIMAL: undefined,
}as const;

export type RepositoryMember = keyof typeof CATALOG;

export class DbFactory {
    public static createDb(req: string): IDbProxy
    {
        const key = req in CATALOG ? req as RepositoryMember : "DEFAULT";
        return CATALOG[key];
    }
}