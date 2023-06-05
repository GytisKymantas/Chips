import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import GiftBox from '../../public/giftBox';
import { CounterType } from '../../types/interfaces';
import {
  BONUS_ONE,
  PERCENTAGE_ONE,
  BONUS_TWO,
  PERCENTAGE_TWO,
  BONUS_THREE,
  PERCENTAGE_THREE,
  BONUS_FOUR,
  PERCENTAGE_FOUR,
} from '../../utils/Constants';

interface BonusBoxProps {
  disabled?: boolean;
  index: number;
  selectedBox: number;
}
const BonusBox: React.FC<BonusBoxProps> = ({
  disabled,
  index,
  selectedBox,
}) => {
  const counter = useSelector((state) => state) as CounterType;
  const depositNumber = counter.counter.active_modal;

  const handleFrom = () => {
    if (index === 1) {
      return 'from';
    }
    if (index === 2) {
      return 'from';
    }
    if (index === 3) {
      return 'min.';
    }
  };

  let BonusArray;
  let PercentageArray;

  switch (depositNumber) {
    case 1:
      BonusArray = BONUS_ONE;
      PercentageArray = PERCENTAGE_ONE;
      break;
    case 2:
      BonusArray = BONUS_TWO;
      PercentageArray = PERCENTAGE_TWO;
      break;
    case 3:
      BonusArray = BONUS_THREE;
      PercentageArray = PERCENTAGE_THREE;
      break;
    case 4:
      BonusArray = BONUS_FOUR;
      PercentageArray = PERCENTAGE_FOUR;
      break;
    default:
      BonusArray = BONUS_ONE;
      PercentageArray = PERCENTAGE_ONE;
  }

  return (
    <Box
      sx={{
        background: '#2E2E2E',
        padding: '12px 14px',
        opacity: disabled ? '1' : '0.5',
        border:
          selectedBox === index && disabled
            ? '2px solid #F3BA2F'
            : '2px solid transparent',
        boxShadow:
          selectedBox === index && disabled
            ? '0px 0px 5px -1px #F3BA2F'
            : 'none',
        borderRadius: '10px',
        display: 'flex',
        gap: '15px',
        cursor: !disabled ? 'arrow' : 'pointer',
      }}
    >
      <Box sx={{ opacity: disabled ? '1' : '0.7' }}>
        <GiftBox />{' '}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '60px' }}>
        <Typography
          component='span'
          style={{
            color: '#8E8E8E',
            fontWeight: '400',
            fontSize: '11px',
            lineHeight: '16px',
          }}
        >
          {handleFrom()} ${BonusArray[index - 1]}
        </Typography>
        <Typography
          component='span'
          style={{
            color: '#F3BA2F',
            fontSize: '18px',
            lineHeight: '13px',
            fontWeight: '700',
          }}
        >
          {PercentageArray[index - 1]}%{' '}
          <Typography
            component='span'
            style={{
              color: '#F3BA2F',
              fontSize: '12px',
              lineHeight: '13px',
              fontWeight: '700',
            }}
          >
            BONUS
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default BonusBox;
