import { move, types } from "@prisma/client";

const organizeMoves = async (url: string, types: Map<string, types>) => {
    const response = await (await fetch(url)).json();
    const typeId = (await (await fetch(response.type.url)).json()).id;
    
    if (!types.has(response.type.name)) {
        types.set(response.type.name, {
            id: typeId,
            name: response.type.name
        });
    }

    return {
        id: response.id,
        accuracy: response.accuracy,
        damageClass: response.damage_class.name.toUpperCase(),
        description: response.effect_entries[0]?.effect ?? "",
        name: response.name,
        power: response.power,
        pp: response.pp,
        priority: response.priority,
        typeId,
    } as move;
}

export default organizeMoves;
