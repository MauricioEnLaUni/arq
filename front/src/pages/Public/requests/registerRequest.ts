import axios from "../../../api/axios";

type RegisterDto = {
    usr: string,
    password: string,
    email: string,
}

export default async ({ usr, password, email }: RegisterDto) => {
    const response = await axios.post("/auth/register", JSON.stringify({
        nombreUsuario: usr,
        password,
        email
    }), { headers: { "Content-Type": "application/json" }});

    
};
