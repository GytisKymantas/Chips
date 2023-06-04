import { Box } from '@mui/system';
import React from 'react';
import CrossedIcon from '../../public/crossedIcon';
import GiftBox from '../../public/giftBox';
import GiftBoxGray from '../../public/giftBoxGray';

interface BonusBoxProps {
  fromNumber: number;
  percentage: number;
  disabled?: boolean;
  index: number;
  valueIndex: number;
}
const BonusBox: React.FC<BonusBoxProps> = ({
  fromNumber,
  percentage,
  disabled,
  index,
  valueIndex,
}) => {
  return (
    <Box
      sx={{
        background: '#2E2E2E',
        padding: '12px 14px',
        opacity: disabled ? '1' : '0.5',
        border:
          valueIndex === index && disabled
            ? '2px solid #F3BA2F'
            : '2px solid transparent',
        boxShadow:
          valueIndex === index && disabled
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
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '50px' }}>
        <span
          style={{
            color: '#8E8E8E',
            fontWeight: '400',
            fontSize: '11px',
            lineHeight: '16px',
          }}
        >
          from ${fromNumber}
        </span>
        <span
          style={{
            color: '#F3BA2F',
            fontSize: '18px',
            lineHeight: '13px',
            fontWeight: '700',
          }}
        >
          {percentage}%{' '}
          <span
            style={{
              color: '#F3BA2F',
              fontSize: '12px',
              lineHeight: '13px',
              fontWeight: '700',
            }}
          >
            BONUS
          </span>
        </span>
      </Box>
    </Box>
  );
};

export default BonusBox;
