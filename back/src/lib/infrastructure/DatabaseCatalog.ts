const DATABASE_CATALOG = {
    DEFAULT: "DEFAULT",
    USERS: "USERS",
    POKEMON: "POKEMON",
    TOKEN: "TOKEN",
} as const;

export type DatabaseCatalog = keyof typeof DATABASE_CATALOG;

const dbs = new Set<string>(["DEFAULT", "USERS", "POKEMON", "TOKEN"]);

export const asDbCatalog = (query: string): DatabaseCatalog => {
    const db = (dbs.has(query) ? query : "DEFAULT") as DatabaseCatalog;

    return db;
};

export default DATABASE_CATALOG;
