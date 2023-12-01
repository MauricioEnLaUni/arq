import Button, { ButtonProps } from "@mui/material/Button";
import { useTranslation } from "react-i18next";

export default ({ text, props }: { text: string; props?: ButtonProps }) => {
    const { t } = useTranslation();

    return (
        <Button
            {...props}
            className={ `bg-blue-500 text-slate-50 font-black text-lg m-4 w-8/12 hover:bg-blue-700 font-mono ${ props?.className }` }>
            {t(text)}
        </Button>
    );
};
