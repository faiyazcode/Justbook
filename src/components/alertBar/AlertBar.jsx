import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertBar({openAlert, alertMessage, handleAlertClose, type}) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={type ? type :'error'} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}