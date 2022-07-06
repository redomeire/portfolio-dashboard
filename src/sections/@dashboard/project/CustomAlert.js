import { Alert } from "@mui/material";
import PropTypes from 'prop-types';

export default function CustomAlert({severity, sx, children, onClose}){
    return(
        <Alert severity={severity} sx={sx} onClose={onClose}>{children}</Alert>
    );
}

CustomAlert.propTypes = {
    severity: PropTypes.func.isRequired,
    sx: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}