import { move, types } from "@prisma/client";
import Record from "./Record.js";
import cacheMoves from "./cache/cacheMoves.js";

const getMoves = async (record: Record, cache: Map<string, move>, types: Map<string, types>) => {
    await cacheMoves(record, cache, types);
    return cache.get(record.name);
};

export default getMoves;
