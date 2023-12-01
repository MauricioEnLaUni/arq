import { PrismaClient, ability } from "@prisma/client";
import prismaRelations from "./prismaRelations.js";

const seeder = async () => {
    const abilities = new Map<string, ability>();
    const types = new Map<string, any>();
    const moves = new Map<string, any>();
    const items = new Map<string, any>();

    const client = new PrismaClient();
    const typeSet = new Set<number>([]);

    let i = 0;
    while (++i <= 151)
    {
        await prismaRelations({
            pokemon: i,
            abilities,
            types,
            moves,
            items,
            client,
            typeSet
        });
    }
}

export default seeder;
