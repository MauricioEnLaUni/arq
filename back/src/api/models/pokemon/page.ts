import { PrismaClient } from "@prisma/client";

const pageSize = 25;

const page = async (req, res) => {
    const current = req.query.page;
    const prisma = new PrismaClient();

    const skip = current && current > 0 ? (current - 1) * pageSize : 0;
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
