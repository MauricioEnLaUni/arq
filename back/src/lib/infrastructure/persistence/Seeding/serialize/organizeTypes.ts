import { types } from "@prisma/client";

const organizeTypes = async (url: string) => {
    const response = await (await fetch(url)).json();

    return {
        id: response.id,
        name: response.name
    } as types;
}

export default organizeTypes;
