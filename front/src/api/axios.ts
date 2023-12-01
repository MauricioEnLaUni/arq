import axios from "axios";
// import encryptData from "./encryptData";

const baseURL = import.meta.env.VITE_SERVER_URL!;

export default axios.create({
    baseURL,
});

export const axiosPrivate = axios.create({
    baseURL,
    withCredentials: true,
});


/* axiosPrivate.interceptors.request.use(
    config => {
        return encryptData(config);
    }, error => Promise.reject(error)
);*/
