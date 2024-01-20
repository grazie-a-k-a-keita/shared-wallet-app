import { Box, CircularProgress, Modal } from '@mui/material';

import loading from '../../assets/svg/loading.svg';
import { DefaultMainYellow, Size12 } from '../../styles/variables';

function MuiProgress() {
  return (
    <Modal open sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ position: 'relative', width: Size12, height: Size12 }}>
        <CircularProgress
          size={48}
          sx={{ color: DefaultMainYellow, position: 'absolute', top: 0, left: 0 }}
        />
        <img
          src={loading}
          alt=''
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        />
      </Box>
    </Modal>
  );
}

export default MuiProgress;
