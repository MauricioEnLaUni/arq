import PgAccess from "../../../lib/infrastructure/PgAccess.js";

const singlePokemon = async (req, res) => {
    const id = Number(req.params.id);
    const prisma = PgAccess.getClient();

    const pokemon = await prisma.pokemon.findFirst({
        where: { id },
        include: {
            abilities: {
                select: {
                    ability: {
                        select: {
                            name: true,
                            description: true
                        }
                    }
                }
            },
            held_items: {
                select: {
                    item: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            moves: {
                select: {
                    move: {
                        select: {
                            name: true,
                            accuracy: true,
                            pp: true,
                            power: true,
                            type: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    }
                }
            },
            stats: {
                select: {
                    name: true,
                    base: true,
                }
            },
            types: {
                select: {
                    type: {
                        select: {
                            name: true
                        }
                    }
                }
            },
        }
    });

    /*const caught = !!await prisma.party.findFirst({
        where: { usuariosId: usrId },
        include: {
            slot: {
                include: {
                    pokemon: {
                        where: {
                            id: pkmId
                        }
                    }
                }
            }
        }
    });*/

    return res.status(200).json(pokemon);
}

export default singlePokemon;
