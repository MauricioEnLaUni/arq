import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import sentenceCase from "../../../../lib/sentenceCase";

import DueñoSelect from "./DueñoSelect";

const fields = ["nombre", "dueño", "tipoRaza"];

export default () => {
    return(
        <Container>
            <form>
                { fields.map(e => (
                    e === "dueño" ?
                        <DueñoSelect /> : <TextField label={ sentenceCase(e) } name={ e } fullWidth/>
                ))}
                <Button type="submit">
                    Añadir paciente
                </Button>
            </form>
        </Container>
    );
};
