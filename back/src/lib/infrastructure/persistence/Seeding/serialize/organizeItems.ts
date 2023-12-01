import { item } from "@prisma/client";

const organizeItems = async (url: string) => {
    const response = await (await fetch(url)).json();

    return {
        id: response.id,
        cost: response.cost,
        description: response.effect_entries[0].effect,
        name: response.name
    } as item;
}

export default organizeItems;
