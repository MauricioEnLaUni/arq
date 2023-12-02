import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack/Stack";
import Box from "@mui/material/Box/Box";
import Divider from "@mui/material/Divider/Divider";

import data from "../../assets/data/data";


const NavBar = () => {
  return(
    <Stack direction={"column"} className="flex justify-end w-full items-center" spacing={1.25}>
      <Stack direction={"row"} spacing={2} className="bg-purple-700 text-teal-200 px-3 w-full rounded flex justify-end  items-center">
      { data[0].contents.map((e, i) => (
        <Stack key={`${i}-session`} className="flex">
          <Link to={e.to} className="text-md py-1 font-bold leading-3 hover:text-teal-100">{e.text}</Link>
          <Divider orientation={"vertical"} />
        </Stack>
      ))}
      </Stack>
      <Stack direction={"row"} spacing={1} className="flex justify-end h-full w-full items-center pr-20">
      { data[2].contents.map((e: any, i: number) => (
        <Box key={`${i}-nav-links`} className="flex space-evenly items-center w-full justify-end">
          <Link to={e.to} className="font-bold bg-cyan-800 px-5 hover:bg-cyan-600 hover:text-stone-200 text-stone-800">
            {e.text}
          </Link>
          <Divider orientation={"vertical"} />
        </Box>
      ))}
      </Stack>
    </Stack>
  );
}

export default NavBar;
