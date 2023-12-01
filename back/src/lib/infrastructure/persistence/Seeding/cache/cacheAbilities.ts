import Record from "../Record.js";
import organizeAbilities from "../serialize/organizeAbilities.js";

const cacheAbilities = async (current: Record, abilities: Map<string, any>) => {
    if (!abilities.has(current.name)) {
        const value = await organizeAbilities(current.url);
        abilities.set(current.name, value);
    }
    
    return abilities.get(current.name);
}

export default cacheAbilities;
