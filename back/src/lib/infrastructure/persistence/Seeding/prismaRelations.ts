import { item, move, pokemon, types, stats, PrismaClient } from "@prisma/client";
import cacheAbilities from "./cache/cacheAbilities.js";
import cacheItems from "./cache/cacheItems.js";
import cacheTypes from "./cache/cacheTypes.js";
import cacheMoves from "./cache/cacheMoves.js";

type Relations = {
    pokemon: number,
    abilities: Map<string, any>,
    moves: Map<string, move>,
    types: Map<string, types>,
    items: Map<string, item>,
    client: PrismaClient,
    typeSet: Set<number>
};

const prismaRelations = async ({
    pokemon,
    abilities = new Map(),
    moves = new Map(),
    types = new Map(),
    items = new Map(),
    client,
    typeSet,
}: Relations) => {
    console.log(`Started: ${ pokemon }`);
    const current = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${ pokemon }`)).json();
    const pkm: pokemon = { 
        id: current.id,
        name: current.name,
        height: current.height,
        weight: current.weight,
        base_exp: current.base_experience
    };
    const stats: stats[] = current.stats.map(s => ({ base: s.base_stat, name: s.stat.name, effort: s.effort, pokemonId: s.pokemonId }));
    await client.pokemon.create({
        data: {
            ... pkm,
            stats: {
                createMany: {
                    data: stats
                }
            }
        }
    });

    for (const a of current.abilities)
    {
        const insert = !abilities.has(a.ability.name);
        const ability = await cacheAbilities(a.ability, abilities);
        
        if (insert) {
            await client.ability.create({ data: { ... ability }});
        }
        await client.pokemonAbility.create({ data: {
            pokemon: {
                connect: {
                    id: pkm.id
                }
            },
            ability: {
                connect: {
                    id: ability.id
                }
            }
        }});
    }

    for (const i of current.held_items)
    {
        const insert = !items.has(i.item.name);
        const item = await cacheItems(i.item, items);
        if (insert) {
            await client.item.create({ data: { ... item }});
        }
        await client.pokemonItem.create({
            data: {
                pokemon: {
                    connect: { id: pkm.id}
                },
                item: {
                    connect: { id: item.id }
                }
            }
        });
    }
    
    for (const t of current.types)
    {
        const insert = !types.has(t.type.name);
        const type = await cacheTypes(t.type, types);
        if (insert) {
            await client.types.create({ data: { ... type }});
        }
        await client.pokemonTypes.create({
            data: {
                pokemon: {
                    connect: {
                        id: pkm.id
                    }
                },
                type: {
                    connect: {
                        id: type.id
                    }
                }
            }
        });
        typeSet.add(type.id);
    }

    for (const m of current.moves)
    {
        const insert = !moves.has(m.move.name);
        const move = await cacheMoves(m.move, moves, types);

        for (const t of types)
        {
            if (!typeSet.has(t[1].id)) {
                await client.types.create({
                    data: { ... t[1] }
                });
                typeSet.add(t[1].id)
            }
        }

        if (insert) {
            const { id, accuracy, damageClass, description, name, power, pp, priority, effectChance } = move;
            
            await client.move.create({ data: {
                id, accuracy: accuracy ?? 0, damageClass, description, name, power: power ?? 0, pp, priority, effectChance,
                type: {
                    connect: {
                        id: move.typeId
                    }
                },
            }});
        }

        await client.pokemonMove.create({
            data: {
                pokemon: {
                    connect: {
                        id: pkm.id
                    }
                },
                move: {
                    connect: {
                        id: move.id
                    }
                },
            }
        });
    }

    console.log(`Donezo with: ${ pokemon }`);
}

export default prismaRelations;
