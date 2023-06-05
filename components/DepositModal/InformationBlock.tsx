import { Box, Typography } from '@mui/material';
import React from 'react';
import {
  CARD_ONE,
  CARD_TWO,
  CARD_THREE,
  CARD_FOUR,
} from '../../utils/Constants';
import { handlePercentage } from '../../utils/Functions';

interface InformationBlockProps {
  depositNumber: number;
}
const InformationBlock: React.FC<InformationBlockProps> = ({
  depositNumber,
}) => {
  let CardArray;

  switch (depositNumber) {
    case 1:
      CardArray = CARD_ONE;
      break;
    case 2:
      CardArray = CARD_TWO;
      break;
    case 3:
      CardArray = CARD_THREE;
      break;
    case 4:
      CardArray = CARD_FOUR;
      break;
    default:
      CardArray = CARD_ONE;
  }

  return (
    <Box
      sx={{
        width: '275px',
        height: '161px',
        background: '#202020',
        boxShadow: '-10px 10px 30px rgba(0, 0, 0, 0.6)',
        borderRadius: '15px',
        padding: '22px',
      }}
    >
      <Typography
        variant='body1'
        sx={{
          color: '#FFFFFF',
          fontWeight: '700',
          fontSize: '14px',
          lineHeight: '20px',
        }}
      >
        {depositNumber}st deposit with up to {handlePercentage(depositNumber)}%
        BONUS:
      </Typography>
      <Box sx={{ border: '1px solid gray', margin: '13px 0 16px 0' }} />
      <Box>
        <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          {CardArray.map(({ from, bonus }, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                sx={{ fontSize: '14px', lineHeight: '25px', color: '#FFFFFF' }}
              >
                {from}
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  color: '#F3BA2F',
                  fontSize: '14px',
                  lineHeight: '25px',
                  fontWeight: '600',
                }}
              >
                {bonus}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default InformationBlock;
