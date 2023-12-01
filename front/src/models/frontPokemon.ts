type PokemonCatalog = {
    id: number;
    name: string;
    types: {
        type: {
            name: string
        }
    }[]
};

export type FlatPokemonCatalog = {
    id: number;
    name: string;
    types: string[];
};

export const flattenPokemonCatalog = (original: PokemonCatalog): FlatPokemonCatalog => {
    const types = original.types.map(t => t.type.name);
    return {
        id: original.id,
        name: original.name,
        types
    }
};

export { type PokemonCatalog as default };
