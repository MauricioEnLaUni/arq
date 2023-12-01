import axios from "../api/axios";
import useAuth from "./useAuth";

export default () => {
    const { setAuth } = useAuth();

    return async () => {
        const response = await axios.get("/refresh", {
            withCredentials: true
        });

        setAuth(response.data);

        return response.data.accessToken;
    };
};
