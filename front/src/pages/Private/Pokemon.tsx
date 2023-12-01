import { useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import fetchMainPage from "../../api/MainPage/fetchMainPage";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import FrontPageCard from "../../components/Front/FrontPageCard";
import Pagination from "../../components/Pagination";

const PokemonCatalogPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) ?? 1;
    const { data, isLoading } = useQuery({
        queryFn: () => fetchMainPage(page),
        queryKey: ["frontPagePokemon", page],
    });

    return (
        <Container className="mt-5">
            { isLoading &&
            <Stack>
                <Container className="flex justify-center">
                    <Grid container spacing={1.25} className="content-between items-center flex">
                        { data?.map((e: any) => (
                            <Grid lg={2} key={`pkm-card-${ e.name }`}>
                                <FrontPageCard id={e.id} name={e.name} types={e.types} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Container className="mx-auto my-4">
                    <Pagination records={ 151 } display={24} current={ page } setCurrent={setSearchParams} />
                </Container>
            </Stack>
            }
        </Container>
    );
};

export default PokemonCatalogPage;
