import PgAccess from "../../../lib/infrastructure/PgAccess.js";

const pageSize = 24;

const page = async (req, res) => {
    const current = req.query.page;
    const prisma = PgAccess.getClient();

    const skip = current && current > 0 ? (current) * pageSize : 0;
    const page = await prisma.pokemon.findMany({
        skip,
        take: pageSize,
        orderBy: {
            id: "asc"
        },
        select: {
            id: true,
            name: true,
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

    return res.status(200).json(page);
};

export default page;
