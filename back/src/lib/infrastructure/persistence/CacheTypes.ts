import { ability, item, move, } from "@prisma/client";

import PkmCache, { IFactory } from "./CacheFactory.js";
import InterceptedCache from "./InterceptedCache.js";

const createItemCache = new PkmCache(
    (data: any) => ({
        id: data.id,
        name: data.name,
    })
);

export const CACHE_TYPES = {
    ABILITY: new PkmCache<ability>(
        (data: any) => {
            const abi = data.effect_entries ?
                data.effect_entries?.find(e => e.language.name === "en")?.effect :
                    undefined;
            const description = abi ?? "";

            return {
                id: data.id,
                name: data.name,
                description
            }
        }
    ),
    ITEMS: new PkmCache<item>(
        (data: any) => {
            const item = data.effect_entries ?
                data.effect_entries?.find(e => e.language.name === "en")?.effect :
                    undefined;
            const description = item ?? "";

            return {
                id: data.id,
                cost: data.cost,
                description,
                name: data.name,
            }
        }
    ),
    TYPES: createItemCache,
    MOVES: new InterceptedCache<move>(
        createItemCache,
        (data: any) => {
            const parts = data.type.url.split("/");
            const typeId = parseInt(parts[parts.length - 2], 10);

            const description = data.effect_entries ?
                data.effect_entries?.find(e => e.language.name === "en")?.effect :
                    undefined;

            const effectChance = data.effect_chance ?? null;

            return {
                id: data.id,
                accuracy: data.accuracy,
                damageClass: data.damage_class.name.toUpperCase(),
                effectChance,
                description,
                name: data.name,
                power: data.power,
                pp: data.pp,
                priority: data.priority,
                typeId,
            };
        },
        (data: any) => {
            const { name, url } = data.type;

            return {
                key: name,
                url,
            };
        }
    ),
} as const;

export type CacheTypes = keyof typeof CACHE_TYPES;

class CacheFactory
{
    private static keys = new Set<string>(["ABILITY", "ITEMS", "MOVES", "TYPES"]);

    static getCache(type: string): IFactory
    {
        if (!CacheFactory.keys.has(type))
        {
            throw new Error("Unknown factory");
        }

        return CACHE_TYPES[type];
    }
}

export default CacheFactory;
