import InputAdornment from "@mui/material/InputAdornment";

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircle from "@mui/icons-material/CheckCircle";

export default ({ valid, focus, name }: { valid: boolean, focus: boolean, name: string }) => (
    <InputAdornment position="end">
        { valid ?
            <CheckCircle className="text-emerald-700" id={ name }/> :
                focus ? <CancelIcon className="text-rose-700" id={ name } /> :
                    <></> }
    </InputAdornment>
);