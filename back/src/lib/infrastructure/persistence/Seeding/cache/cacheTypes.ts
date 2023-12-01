import { types } from "@prisma/client";
import Record from "../Record.js";
import organizeTypes from "../serialize/organizeTypes.js";

const keys = new Set(["double_damage_from", "double_damage_to", "half_damage_from", "half_damage_to", "no_damage_from", "no_damage_to"]);

const cacheTypes = async (current: Record, cache: Map<string, types>) => {
    if (!cache.has(current.name)) {
        const value = await organizeTypes(current.url);
        cache.set(current.name, value);
    }

    return cache.get(current.name);
}

export default cacheTypes;
