import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import getOne from "../../models/getOne";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const SinglePokemon = () => {
    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryFn: () => getOne(Number(id)),
        queryKey: ["getOne"]
    });

    const { pkm, ability, moves, items, stats } = data;

  return (
    <Container>
        <Grid container>
            <Grid xs={3}>
                <Stack>
                    <Container>
                        <img src={`${ pkm.id }`} alt={`${ pkm.name } sprite`} />
                    </Container>
                    <Typography>#{ pkm.id }&nbsp;{ pkm.name }</Typography>
                    <Container>
                        <TypeLogo>
                            
                        </TypeLogo>
                    </Container>
                </Stack>
            </Grid>
        </Grid>
    </Container>
  )
}

export default SinglePokemon;
