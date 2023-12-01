import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export default () => {
    return useContext(AuthContext);
};
