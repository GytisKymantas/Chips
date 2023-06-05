import { Box } from '@mui/material';
import React, { useState } from 'react';
import ClaimModal from '../ClaimModal';
import DepositModal from '../DepositModal';
import Initial from '../../public/Initial';
import { ModalTypes } from '../../utils/ModalData';

const ModalContainer = () => {
  const [modal, setModal] = useState('');

  const renderModal = () => {
    if (modal === ModalTypes.DepositModal) {
      return <DepositModal setModal={setModal} />;
    }

    if (modal === ModalTypes.ClaimModal) {
      return <ClaimModal setModal={setModal} />;
    }

    return (
      <Box
        sx={{
          width: '200px',
          height: '100px',
          cursor: 'pointer',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        onClick={() => setModal(ModalTypes.ClaimModal)}
      >
        <Initial />
      </Box>
    );
  };

  return <Box>{renderModal()}</Box>;
};

export default ModalContainer;
