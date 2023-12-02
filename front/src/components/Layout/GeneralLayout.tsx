import { Outlet } from "react-router-dom";

import Stack from "@mui/material/Stack/Stack";

import Header from "./Header";
// import Footer from './Footer';

const GeneralLayout = () => (
  <Stack>
    <Header />
    <Outlet />
    {/*<Footer />*/}
  </Stack>
);

export default GeneralLayout;