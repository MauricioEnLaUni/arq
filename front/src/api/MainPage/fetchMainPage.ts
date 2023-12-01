import axios from "../axios";

import { flattenPokemonCatalog } from "../../models/frontPokemon";

const fetchMainPage = async (page: number) => {
    const { data } = await axios.get(`/pokemon/?page=${ page }`);
    const result = data.map((e: any) => {
        return flattenPokemonCatalog(e);
    });

    return result;
};

export default fetchMainPage;
