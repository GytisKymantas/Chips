import { Box } from '@mui/material';
import React, { useState } from 'react';
import ClaimModal from '../ClaimModal';
import DepositModal from '../DepositModal';

const ModalContainer = () => {
  const [modal, setModal] = useState('');

  console.log(modal, 'which modal');

  const renderModal = () => {
    if (modal === 'Deposit Modal') {
      return <DepositModal setModal={setModal} />;
    }

    if (modal === 'Claim Modal') {
      return <ClaimModal setModal={setModal} />;
    }

    return (
      <Box
        sx={{
          background: 'gray',
          width: '200px',
          height: '100px',
          cursor: 'pointer',
        }}
        onClick={() => setModal('Claim Modal')}
      >
        initial modal
      </Box>
    );
  };

  return <div>{renderModal()}</div>;
};

export default ModalContainer;
