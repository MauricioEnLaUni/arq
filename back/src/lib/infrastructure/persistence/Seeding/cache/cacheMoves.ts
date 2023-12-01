import { move, types } from "@prisma/client";

import Record from "../Record.js";
import organizeMoves from "../serialize/organizeMoves.js";

const cacheMoves = async (current: Record, moves: Map<string, move>, types: Map<string, types>) => {
    if (!moves.has(current.name)) {
        const value = await organizeMoves(current.url, types);
        moves.set(current.name, value);
    }

    return moves.get(current.name);
}

export default cacheMoves;
