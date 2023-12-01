import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Info from "@mui/icons-material/Info";
import { useTranslation } from "react-i18next";

export default ({ label, info }: { label: string, info: string }) => {
    const { t } = useTranslation();
    
    return(
        <Container>
            <Typography id={ `${ label }-status` } className="text-xs" role="status" >
                <Info />
                { t(`publicRoutes.${ info }`) }
            </Typography>
        </Container>
    );
};
