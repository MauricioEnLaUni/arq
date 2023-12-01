import Typography from "@mui/material/Typography";
import typeColors from "../../Providers/Types/Colors";

const TypeLogo = ({ type }: { type: string }) => {
    const copy = type.toUpperCase();
    // @ts-ignore
    const bg = typeColors[copy];
  return (
    <Typography className={`${ bg } text-xs tet-center items-center justify-center flex rounded p-0.5 select-none text-white font-bold w-12`}>
        { copy }
    </Typography>
  )
}

export default TypeLogo;
