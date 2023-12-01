import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import { useParams } from "react-router-dom";

const paragraphs = new Map([
    [404, "¡No se ha encontrado la página!"],
    [500, "Error desconocido."],
]);

export default () => {
    const { error } = useParams();
    const title = error ?? 404;

    return (
        <Container className={"mt-12"}>
            <Paper elevation={4} variant={"outlined"} square={false}>
                <Grid container>
                    <Grid xs={12} md={8}>
                        <Typography
                            className={
                                "text-9xl text-center my-6 title-shadow font-medium"
                            }>
                            {title}
                        </Typography>
                        <Typography className={"text-lg m-2 font-semibold"}>
                            {paragraphs.get(Number(title)) ??
                                paragraphs.get(500)}
                        </Typography>
                    </Grid>
                    <Grid xs={0} md={4}>
                        <img
                            src={`/img/errores/${title}.avif`}
                            alt={`Página de Error ${title}`}
                            width={128}
                            height={600}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};
