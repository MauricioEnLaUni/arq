import axios from "../api/axios";

const fetchMainPage = async (id: number) => {
    const { data } = await axios.get(`/pokemon/?id=${ id }`);

    return data;
};

export default fetchMainPage;
