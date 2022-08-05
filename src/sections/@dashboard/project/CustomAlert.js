import { Alert } from "@mui/material";
import PropTypes from 'prop-types';

export default function CustomAlert({severity, sx, children, onClose}){
    return(
        <Alert severity={severity} sx={sx} onClose={onClose}>{children}</Alert>
    );
}

CustomAlert.propTypes = {
    severity: PropTypes.string.isRequired,
    sx: PropTypes.object.isRequired,
    children: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}