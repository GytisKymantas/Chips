import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CrossedIcon from '../../public/crossedIcon';
import InformationIcon from '../../public/informationIcon';
import { addDeposit } from '../../store/reducers/counter';
import {
  USDfloat,
  EUROfloat,
  values,
  fromNumbers,
} from '../../utils/ModalData';
import BonusBox from './BonusBox';

// Dispatch<SetStateAction<boolean>>;?

interface DepositModal {
  setModal: any;
}

const DepositModal: React.FC<DepositModal> = ({ setModal }) => {
  const dispatch = useDispatch();

  const [currency, setCurrency] = useState('EUR');
  const [checked, setChecked] = useState(false);
  const [selectedBox, setSelectedBox] = useState(0);
  const [value, setValue] = useState<number>();
  const counter = useSelector((state) => state);
  console.log(counter.counter.active_modal, 'ayoo bch');
  const handleToggle = () => {
    setChecked(!checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const depositNumber = counter.counter.active_modal;
    const amount = parseFloat(value);
    // const currentAmount = counter.counter.deposit_1

    let multipliedAmount = 0;

    if (selectedBox === 0 && amount >= 30 && amount <= 99) {
      multipliedAmount = amount * 1;
    } else if (selectedBox === 1 && amount >= 100 && amount <= 399) {
      multipliedAmount = amount * 1.5;
    } else if (selectedBox === 2 && amount >= 400 && amount <= 900) {
      multipliedAmount = amount * 2;
    } else {
      multipliedAmount = amount;
    }

    // console.log(multipliedAmount, 'multiplied'); // Check the final value of multipliedAmount

    dispatch(addDeposit({ depositNumber, amount: multipliedAmount }));
    setModal('Claim Modal');
  };

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;

    if (currency === 'EUR' && selectedCurrency === 'USD') {
      setCurrency(selectedCurrency);
      setValue(Number((value * USDfloat).toFixed(2)));
    } else if (currency === 'USD' && selectedCurrency === 'EUR') {
      setCurrency(selectedCurrency);
      setValue(Number((value * EUROfloat).toFixed(2)));
    } else {
      setCurrency(selectedCurrency);
    }
  };

  return (
    <Box
      sx={{
        width: '478px',
        background: '#0d0d0d',
        borderTopRightRadius: '20px',
        borderTopLeftRadius: '20px',
      }}
    >
      <Box
        sx={{
          width: '438px',
          background: '#0d0d0d',
          borderTopRightRadius: '20px',
          borderTopLeftRadius: '20px',
          padding: '20px 20px 0 20px',
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
            Select amount
          </Typography>
          <Box sx={{ cursor: 'pointer' }} onClick={() => setModal('Initial')}>
            <CrossedIcon />
          </Box>
        </Box>
        <Box sx={{ marginBottom: '47px' }}>
          <Typography
            variant='body1'
            sx={{
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#8E8E8E',
            }}
          >
            Next step: Payment method
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          background: 'rgb(33 33 33)',
          borderTopRightRadius: '20px',
          borderTopLeftRadius: '20px',
          borderRadius: '20px',
          width: '400px',
          height: '828px',
          padding: '45px 39px',
        }}
      >
        <Box>
          <Box>
            <Box component='form' onSubmit={handleSubmit}>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  type='number'
                  fullWidth
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  sx={{
                    border: '2px solid #FFFFFF',
                    borderRadius: '10px',
                  }}
                  InputProps={{
                    inputMode: 'none',

                    style: { color: '#FFFFFF' },
                  }}
                />
                <Select
                  value={currency}
                  onChange={handleCurrencyChange}
                  sx={{
                    border: '1px solid #FFFFFF',
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    height: '40px',
                    width: '84px',
                    position: 'absolute',
                    top: '10px',
                    left: '70%',
                  }}
                >
                  <MenuItem value='EUR'>EUR</MenuItem>
                  <MenuItem value='USD'>USD</MenuItem>
                </Select>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '10px 0 10px 0',
                }}
              >
                <Box
                  sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                >
                  <span
                    style={{
                      background: '#F3BA2F',
                      color: '#212121',
                      fontSize: '13px',
                      lineHeight: '20px',
                      fontWeight: '700',
                      padding: '1px 9px',
                      borderRadius: '5px',
                    }}
                  >
                    {counter.counter.active_modal}st
                  </span>
                  <Typography
                    variant='body1'
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: '700',
                      fontSize: '14px',
                      lineHeight: '21px',
                    }}
                  >
                    Deposit
                  </Typography>
                  <Box sx={{ marginTop: '4px' }}>
                    <InformationIcon />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant='body1'
                    sx={{
                      fontSize: '14px',
                      lineHeight: '21px',
                      color: '#8E8E8E',
                    }}
                  >
                    Use Bonus
                  </Typography>
                  <Switch
                    checked={checked}
                    onChange={handleToggle}
                    color='primary'
                    inputProps={{ 'aria-label': 'toggle' }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'center',
                  marginBottom: '10px',
                }}
              >
                {values.map((value, index) => (
                  <Box key={index} onClick={() => setSelectedBox(index)}>
                    <BonusBox
                      fromNumber={fromNumbers[index]}
                      percentage={value}
                      disabled={checked}
                      index={index}
                      valueIndex={selectedBox}
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  sx={{
                    border: 'none',
                    background: '#ad100a',
                    fontWeight: '700',
                    margin: '15px 0 15px 0',
                    padding: '20px 20px',
                    borderRadius: '10px',
                    width: '100%',
                  }}
                >
                  DEPOSIT NOW
                </Button>
              </Box>
            </Box>
          </Box>
          <Typography
            variant='body1'
            sx={{ textAlign: 'center', color: '#FFFFFF' }}
          >
            Have a promo code?
            <span style={{ color: '#F3302A', cursor: 'pointer' }}>
              Click here
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DepositModal;
