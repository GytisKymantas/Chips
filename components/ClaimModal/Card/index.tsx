import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Confetti from '../../../public/confetti';
import { addDepositModal } from '../../../store/reducers/counter';

interface CardProps {
  index: number;
  background: string;
  setModal: any;
  limitAmount: any;
}

const Card: React.FC<CardProps> = ({
  index,
  background,
  setModal,
  limitAmount,
}) => {
  const counter = useSelector((state) => state);
  const [claimed, setClaimed] = useState(false);
  const dispatch = useDispatch();

  const handleModalSelection = (value: string, index: number) => {
    console.log(index, 'index');
    dispatch(addDepositModal(index));
    setModal(value);
  };
  console.log(counter, 'counter state');

  const bonusAmount = counter.counter[`deposit_${index}`];

  const maximumValue = limitAmount;
  const value = (bonusAmount / maximumValue) * 100;
  const bonusPercentage = value.toFixed(2);
  console.log(index, 'index');

  const handleDisableButton = () => {
    if (bonusAmount > 0) {
      return false;
    }

    if (counter.counter.active_modal !== 2 && index === 3) {
      return true;
    }

    if (counter.counter.active_modal !== 3 && index === 4) {
      return true;
    }
    return false;
  };

  if (claimed) {
    return (
      <Box
        sx={{
          background:
            'linear-gradient(171.43deg, #924FE7 6.25%, #6725BB 95.35%)',
          width: '553px',
          color: '#FFFFFF',
          borderRadius: '20px',
          opacity: handleDisableButton() ? '0.4' : '1',
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'absolute', top: '26%', left: '8%' }}>
          <Typography
            variant='h2'
            sx={{
              fontWeight: '700',
              fontSize: '20px ',
              lineHeight: '28px',
            }}
          >
            {index}st deposit bonus
          </Typography>
          <Typography
            variant='h2'
            sx={{
              fontWeight: '700',
              fontSize: '24px',
              lineHeight: '36px',
              color: '#F3BA2F',
              textAlign: 'center',
            }}
          >
            ${limitAmount}.00
          </Typography>
        </Box>

        <Box
          sx={{
            border: '2px solid #F3BA2F',
            width: '188px',
            padding: '13px',
            transform: 'rotate(-15deg)',
            borderRadius: '10px',
            position: 'absolute',
            top: '28px',
            left: '254px',
          }}
        >
          <Typography
            sx={{
              color: '#F3BA2F',
              fontSize: '32px',
              lineHeight: '33px',
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            CLAIMED
          </Typography>
        </Box>
        <Box>
          <Confetti />
        </Box>
        <Box>
          <Image
            src='/public/red-box.png'
            alt='red box'
            width={153}
            height={139}
          />
        </Box>
        <img src='/public/red-box/png' alt='3' />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: background,
        width: '503px',
        padding: '18px 25px',
        color: '#FFFFFF',
        borderRadius: '20px',
        opacity: handleDisableButton() ? '0.4' : '1',
      }}
    >
      <Typography
        variant='h2'
        sx={{
          fontWeight: '700',
          fontSize: '24px',
          lineHeight: '40px',
        }}
      >
        {index}st deposit
      </Typography>

      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box sx={{ width: '238px' }}>
          <Typography
            variant='body1'
            sx={{
              fontSize: '16px',
              lineHeight: '24px',
              display: 'flex',
              gap: '6px',
            }}
          >
            Bonus amount:
            <span style={{ color: '#F3BA2F' }}>
              ${bonusAmount}/ ${limitAmount}.00
            </span>
          </Typography>
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                width: '100%',
                height: '13px',
                borderRadius: '10px',
                position: 'relative',
                marginTop: '7px',
                background: `linear-gradient(to right, #F3BA2F ${bonusPercentage}%, rgba(0, 0, 0, 0.2) ${bonusPercentage}%)`,
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                fontSize: '9px',
                lineHeight: '14px',
              }}
            >
              {bonusPercentage}%
            </span>
          </Box>
        </Box>
        <Button
          variant='contained'
          sx={{
            background: '#440298',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '16px',
            lineHeight: '24px',
            width: '127px',
            marginLeft: '25px',
          }}
          disabled={handleDisableButton()}
          onClick={() =>
            bonusAmount > 0
              ? setClaimed(true)
              : handleModalSelection('Deposit Modal', index)
          }
        >
          {bonusAmount > 0 ? 'Claim' : 'Deposit'}
        </Button>{' '}
      </Box>
    </Box>
  );
};

export default Card;

// if bonusAmount > 0 return false
// if counter.counter[`deposit_${index}`] !== 2 || counter.counter[`deposit_${index}`] !== 3 return true
