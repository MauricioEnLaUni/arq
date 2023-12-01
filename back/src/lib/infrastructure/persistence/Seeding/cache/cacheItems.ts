import { item } from "@prisma/client";

import Record from "../Record.js";
import organizeItems from "../serialize/organizeItems.js";

const cacheItems = async (current: Record, items: Map<string, item>) => {
    if (!items.has(current.name)) {
        const value = await organizeItems(current.url);
        items.set(current.name, value);
    }

    return items.get(current.name);
}

export default cacheItems;
