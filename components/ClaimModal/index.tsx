import React, { useState } from 'react';
import { Box, List, Typography, ListItem } from '@mui/material';
import Card from './Card';
import ArrowLeft from '../../public/arrowLeft';
import ArrowRight from '../../public/arrowRight';
import CrossedIcon from '../../public/crossedIcon';
import { backgrounds, limitAmount } from '../../utils/ModalData';

interface ClaimModal {
  setModal: any;
}
const ClaimModal: React.FC<ClaimModal> = ({ setModal }) => {
  const [detailsModal, setDetailsModal] = useState(false);

  if (detailsModal) {
    return (
      <Box
        sx={{
          width: '594px',
          height: '828px',
          background: '#151617',
          borderRadius: '20px',
          padding: '45px 39px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
            <Box
              onClick={() => setDetailsModal(false)}
              sx={{ cursor: 'pointer' }}
            >
              <ArrowLeft />
            </Box>
            <Typography
              variant='h2'
              sx={{
                fontWeight: 700,
                fontSize: '32px',
                lineHeight: '40px',
                color: '#FFFFFF',
              }}
            >
              Deposit Bonus
            </Typography>
          </Box>
          <Box sx={{ cursor: 'pointer' }} onClick={() => setModal('Initial')}>
            <CrossedIcon />
          </Box>
        </Box>
        <Box
          sx={{ margin: '54px 0 30px 0', fontSize: '16px', lineHeight: '24px' }}
        >
          <Typography variant='body1' sx={{ color: '#FFFFFF' }}>
            Up to 270% Guaranteed Welcome Bonus With Your First 4 Deposits | No
            Betting Limits, Wagering with deposit Funds!
            <List sx={{ color: '#FFFFFF' }}>
              <ListItem sx={{ color: '#FFFFFF' }}>
                1st deposit max. $900 up to 200% real money bonus
              </ListItem>
              <ListItem>
                2nd deposit max. $2.100 up to 210% real money bonus
              </ListItem>
              <ListItem>
                3rd deposit max. $4.300 up to 220% real money bonus
              </ListItem>
              <ListItem>
                4th deposit max. $7.700 up to 270% real money bonus
              </ListItem>
            </List>
          </Typography>

          <Box>
            <Typography variant='body1' sx={{ color: '#ffffff' }}>
              The Bonus money is guaranteed to be transferred as real money
              after the wagering requirement is met. Deposit $30 or more for
              each stage to claim. <br />
              <br />
              Wagering with deposit funds only, multiple deposits are allowed.
              No bet limits. Bonus percentage and max. deposit amount increases
              after each of the first 4 deposits, max. $15.000.
              <br />
              <br />
              The sum of the first 4 deposits is the base for the total welcome
              bonus amount. Wager the sum to receive the accrued bonus in cash
              with no extra conditions attached. Unlimited cash deposits are
              allowed to complete the wagering requirement. <br />
              <br />
              The deposit balance and any winnings from your deposits can be
              withdrawn at any time after your deposits have been wagered at
              least once (wager x1). Bonus stays active even once a withdrawal
              is submitted. <br />
              <br />
              No expiry on the bonus funds, every deposit and gameplay will
              contribute to the wagering until it is completed, even after the
              4th deposit!
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '594px',
        height: '828px',
        background: '#151617',
        borderRadius: '20px',
        padding: '45px 39px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h2'
          sx={{
            fontWeight: 700,
            fontSize: '32px',
            lineHeight: '40px',
            color: '#FFFFFF',
          }}
        >
          Deposit Bonus
        </Typography>
        <Box sx={{ cursor: 'pointer' }} onClick={() => setModal('Initial')}>
          <CrossedIcon />
        </Box>
      </Box>
      <Box
        sx={{
          marginBottom: '47px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
        }}
        onClick={() => setDetailsModal(!detailsModal)}
      >
        <Typography
          variant='body1'
          sx={{
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#41E8C2',
          }}
        >
          Details
        </Typography>
        <ArrowRight />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {backgrounds.map((background, index) => (
          <Card
            key={index}
            index={index + 1}
            background={background}
            setModal={setModal}
            limitAmount={limitAmount[index]}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ClaimModal;
