import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import getOne from "../../models/getOne";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TypeLogo from "../../components/Front/TypeLogo";

const SinglePokemon = () => {
    const { pokemon } = useParams();
    const { data, isLoading } = useQuery({
        queryFn: () => getOne(Number(pokemon)),
        queryKey: ["getOne"]
    });
    
    if (isLoading) return <></>;

    const { abilities, held_items, moves, stats, types, id, name, base_exp  } = data;
    const statColor = ["bg-red-500", "bg-orange-300", "bg-amber-400", "bg-sky-600", "bg-emerald-400", "bg-pink-500"];

  return (
    <Container>
        <Grid container>
            <Grid xs={3}>
                <Stack>
                    <Container>
                        <img src={`/img/pokemons/${ id }.png`} alt={`${ name } sprite`} />
                    </Container>
                    <Typography>#{ id }&nbsp;{ name }</Typography>
                    <Container>
                        { types.map((e: any, i: number) => <TypeLogo key={`pokemon-type-${ i }`} type={ e.type.name } />)}
                    </Container>
                </Stack>
            </Grid>
            <Grid xs={9}>
                <Stack>
                    <Container>
                        <Grid container>
                            <Grid xs={3} className="h-6">
                                { stats.map((e: any) => {
                                    return(
                                        <Stack key={`stats-${ e.name }`}>
                                            { e.name.toUpperCase() }
                                        </Stack>
                                    );
                                })}
                            </Grid>
                            <Grid xs={1} className="h-6">
                                { stats.map((e: any) => (
                                    <Stack key={`stats-${ e.name }-graph`} className="h-6">
                                        { e.base }
                                    </Stack>
                                ))}
                            </Grid>
                            <Grid xs={6}>
                                { stats.map((e: any, i: number) => (
                                    <Stack key={`stats-${ e.name }-graph`} rowGap={1} className="flex items-start justify-start">
                                        <Container className={`border-solid border-stone-800 overflow-hidden m-0 p-0 items-start flex`}>
                                            <Container style={{ width: `${Math.max(0, Math.min(120, e.base))}%` }} className={`${ statColor[i]} flex h-6 m-0 p-0`}>
                                            </Container>
                                        </Container>
                                    </Stack>
                                ))}
                            </Grid>
                        </Grid>
                    </Container>
                </Stack>
            </Grid>
        </Grid>
    </Container>
  );
}

export default SinglePokemon;
