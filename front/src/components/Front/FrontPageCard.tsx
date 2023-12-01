import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import sentenceCase from "../../lib/sentenceCase";
import TypeLogo from "./TypeLogo";

type Props = {
    id: number;
    name: string;
    types: string[];
}

const FrontPageCard = ({ id, name, types }: Props) => {
    return(
        <Card>
            <CardMedia
                sx={{ height: 156 }}
                image={`/img/pokemons/${ id }.png`}
                title={`media for ${ name }`}
            />
            <CardContent>
                <Typography>{ sentenceCase(name) }</Typography>
            </CardContent>
            <CardActions>
                { types.map((t, i) => <TypeLogo type={t} key={`type-button-${ id }-${ i }`}/>)}
            </CardActions>
        </Card>
    );
};

export default FrontPageCard;
