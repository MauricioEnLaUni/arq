import Grid from "@mui/material/Unstable_Grid2";
import NavBar from "./NavBar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <header className="h-16 bg-gray-800 border-b-8 border-emerald-700 flex">
        <Grid container columns={12} className="flex space-between mx-auto lg:w-9/12 md:w-10/12 xs:w-full h-full" spacing={1}>
            <Grid xs={5} className="items-center flex my-1">
                <img className="h-12 w-12" src="/vite.svg"/>
            </Grid>
            <Grid xs={1} className="bg-slate-500">
                <Container className="overflow-auto p-0 m-0">
                    <Stack>
                        <Typography className="text-xs">
                            Redis Calls: 100
                        </Typography>
                        <Typography className="text-xs">
                            Pg Calls: 100
                        </Typography>
                    </Stack>
                </Container>
            </Grid>
            <Grid xs={6}>
                <NavBar />
            </Grid>
        </Grid>
    </header>
  )
}

export default Header;
