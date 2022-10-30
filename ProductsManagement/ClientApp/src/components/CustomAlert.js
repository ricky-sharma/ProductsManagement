import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomAlert(o) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(o?.options?.enable ?? false)
    }, [o.options]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        if (o?.options?.callback !== undefined && o?.options?.callback !== null) {
            o.options.callback()
        }
    };

    const handleConfirm = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        if (o?.options?.fnConfirm !== undefined && o?.options?.fnConfirm !== null) {
            o.options.fnConfirm()
        }
    };

    return (
        <Snackbar open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={o?.options?.duration === 0 ? null : 5000}
            onClose={handleClose}
            key='topcenter'
            message={(o?.options?.enableAction ? (o?.options?.message ?? "success") : '')}
            action={(o?.options?.enableAction ?
                <React.Fragment>
                    <Button color="primary" size="small" onClick={handleConfirm}>
                        Confirm
                    </Button>
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5 }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </React.Fragment> : null)
            }>
            {(o?.options?.enableAction ? null : <Alert onClose={handleClose} severity={o?.options?.alertColor ?? "success"} sx={{ width: '100%' }}>
                {o?.options?.message ?? "success"}
            </Alert>)}
        </Snackbar>
    );
}