import { ability } from "@prisma/client";

const organizeAbilities = async (url: string) => {
    const response = await (await fetch(url)).json();

    return {
        id: response.id,
        name: response.name,
        description: response.effect_entries[0]?.effect ?? "",
    } as ability;
}

export default organizeAbilities;
