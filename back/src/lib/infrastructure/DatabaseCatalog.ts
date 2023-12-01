const DATABASE_CATALOG = {
    DEFAULT: "DEFAULT",
    USER: "USER",
    POKEMON: "POKEMON",
} as const;

export type DatabaseCatalog = keyof typeof DATABASE_CATALOG;

export const asDbCatalog = (query: string): DatabaseCatalog => {
    return query !== "USER" && query !== "POKEMON" ?
        "DEFAULT" : query;
};

export default DATABASE_CATALOG;
