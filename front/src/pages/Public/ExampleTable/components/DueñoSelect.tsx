import { useEffect, useState } from "react";

import axios from "../../../../api/axios";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";

type Persona = {
    id: string,
    nombre: string,
    telefono: string,
    direccion: string,
}

export default () => {
    const [data, setData] = useState<Persona[]>([]);

    useEffect(() => {
        const get = async () => {
            const response = await axios.get("/personas");
            setData(response.data);
        }

        get();
    }, []);

    return(
        <FormControl className="w-8/12 mt-12">
            <InputLabel id="label-select-dueño">Dueño</InputLabel>
            <Select
                labelId="label-select-dueño"
                id="select-dueño"
                label="Seleccione al dueño del animal"
                role="listbox"
                className="w-full mb-4"
            >
                { data.map(e => (
                    <MenuItem value={ e.id }>{ e.nombre }</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
