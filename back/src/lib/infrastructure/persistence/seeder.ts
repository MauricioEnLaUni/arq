import axios from "axios";

import { PrismaClient, ability, pokemon, stats, item, types, move, } from "@prisma/client";
import PkmCache from "./CacheFactory.js";
import InterceptedCache from "./InterceptedCache.js";

type ScrapperProps = {
    pokemon: number,
    abi: PkmCache<ability>,
    itm: PkmCache<item>,
    tpe: PkmCache<types>,
    mve: InterceptedCache<move>,
    typ: Set<string>,
    client: PrismaClient,
}

const scrapPokemon = async ({
    pokemon,
    abi,
    itm,
    tpe,
    mve,
    typ,
    client,
}: ScrapperProps) => {
    console.log(`Started: ${ pokemon }`);
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const pkm: pokemon = {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        base_exp: data.base_experience,
    };

    const stats: stats[] = data.stats.map(s => ({
        base: s.base_stat,
        name: s.stat.name,
        effort: s.effort,
    }));

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
    
    for (const a of data.abilities)
    {
        const insert = !abi.has(a.ability.name);
        const ability = await abi.getResource({ ... a.ability, key: a.ability.name });
        
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

    for (const i of data.held_items)
    {
        const insert = !itm.has(i.item.name);
        const item = await itm.getResource({ ... i.item, key: i.item.name });
        if (insert) {
            await client.item.upsert({
                where: { id: item.id },
                create: { ... item },
                update: { ... item },
            });
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

    for (const t of data.types)
    {
        const insert = !tpe.has(t.type.name);
        const type = await tpe.getResource({ ... t.type, key: t.type.name });
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
        typ.add(type.name);
    }

    for (const m of data.moves)
    {
        const insert = !mve.has(m.move.name);
        const move = await mve.getResource({ ... m.move, key: m.move.name });

        for (const [_, value] of tpe.cache)
        {
            const { id, name } = value;

            if (!typ.has(name)) {
                await client.types.create({
                    data: { id, name }
                });
                typ.add(name)
            }
        }

        if (insert) {
            const { id, accuracy, damageClass, description, name, power, pp, priority, effectChance } = move;
            
            await client.move.create({
                data: {
                    id, accuracy: accuracy ?? 0, damageClass, description, name, power: power ?? 0, pp, priority, effectChance,
                    type: {
                        connect: {
                            id: move.typeId
                        }
                    },
                }
            });
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

    console.log(`Donezo with: ${ pkm.name }`);
}

export default scrapPokemon;
