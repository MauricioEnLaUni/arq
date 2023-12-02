import Grid from "@mui/material/Unstable_Grid2";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="h-16 bg-gray-800 border-b-8 border-emerald-700">
        <Grid container columns={12} className="flex space-between">
            <Grid xs={5} >
                <img className="h-12 w-12" src="/vite.svg"/>
            </Grid>
            <Grid xs={7}>
                <NavBar />
            </Grid>
        </Grid>
    </header>
  )
}

export default Header;
