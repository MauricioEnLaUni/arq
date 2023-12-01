import { Redis } from "@upstash/redis";
import { TokenRepository } from "./Repository/TokenRepository.js";

import { Client } from "pg";
import { MongoClient } from "mongodb";

export interface IRecord
{
    [key: string]: any;
}

class RedisSingleton
{
    private static client: Redis;
    
    private constructor() { }

    static getInstance()
    {
        if (!RedisSingleton.client) {
            RedisSingleton.client = new Redis({
                url: process.env.AUTH,
                token: process.env.AUTH_TOKEN
            });
        }

        return RedisSingleton.client;
    }
}

class PgSingleton
{
    private static client: Client;
    
    private constructor() { }

    static getInstance()
    {
        if (!PgSingleton.client) {
            PgSingleton.client = new Client();
        }

        return PgSingleton.client;
    }
}

class MongoSingleton
{
    private static client: MongoClient;

    private static db = process.env.MONGO_DB;

    private static collections = new Set(["pacientes", "consulta", "persona", "animal"]);
    
    private constructor() { }

    static getInstance()
    {
        if (!MongoSingleton.client) {
            MongoSingleton.client = new Client();
        }

        return MongoSingleton.client;
    }

    static getCollection(n: number)
    {
        MongoSingleton.client.connect();

        const db = MongoSingleton.client.db(MongoSingleton.db);
        const collection = process.env.MONGO_PACIENTES;
        const col = MongoSingleton.collections[n];

        return db.collection(col);
    }
}

const REPO = {
    DEFAULT: 0,
    USER: PgSingleton.getInstance(),
    TOKEN: RedisSingleton.getInstance(),
    PACIENTE: MongoSingleton.getCollection(0),
    CONSULTA: MongoSingleton.getCollection(1),
    PERSONA: MongoSingleton.getCollection(2),
    TIPO_ANIMAL: MongoSingleton.getCollection(3),
}as const;

export type RepositoryMember = keyof typeof REPO;
