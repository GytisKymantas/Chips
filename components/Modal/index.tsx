import { Box, Card, CardMedia } from '@mui/material';
import React, { useState } from 'react';
import ClaimModal from '../ClaimModal';
import DepositModal from '../DepositModal';
import Image from 'next/image';

const ModalContainer = () => {
  const [modal, setModal] = useState('');

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
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}
        onClick={() => setModal('Claim Modal')}
      >
        {/* <Image
          src='/public/initial.png'
          alt='click me'
          width={200}
          height={100}
        />{' '}
        <img src='/public/bam.jpg' alt='img' />{' '} */}
        <Card>
          <CardMedia
            component='img'
            alt='Example Image'
            image='/public/initial.png' // Replace with the actual path to your image
            title='Example Image'
          />
        </Card>
      </Box>
    );
  };

  return <Box>{renderModal()}</Box>;
};

export default ModalContainer;
