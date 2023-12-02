import { ability } from "@prisma/client";
import Record from "./Record.js";
import cacheAbilities from "./cache/cacheAbilities.js";

const getAbilities = async (cache: Map<string, ability>, record: Record) => {
    await cacheAbilities(record, cache);
    return cache.get(record.name);
};

export default getAbilities;
