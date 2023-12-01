import axios from "../api/axios";

const getOne = async (id: number) => {
    const { data } = await axios.get(`/pokemon/${ id }`);

    return data;
};

export default getOne;
