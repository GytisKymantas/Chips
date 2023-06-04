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
import { addDeposit } from '../../store/reducers/counter';
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
  console.log(selectedBox, 'selectedBox');

  const [value, setValue] = useState<number>(0);

  console.log(value, 'this is VLAUE');
  const counter = useSelector((state) => state);
  console.log(counter.counter.deposit_1, 'cnter');
  const handleToggle = () => {
    setChecked(!checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const depositNumber = 1;
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

    console.log(multipliedAmount, 'multiplied'); // Check the final value of multipliedAmount

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

  const values = [100, 150, 200];
  const fromNumbers = [30, 100, 900];
  const USDfloat = 1.0757;
  const EUROfloat = 0.92963;

  return (
    <Box
      sx={{
        width: '594px',
        height: '828px',
        background: 'lightblue',
        borderRadius: '20px',
        padding: '45px 39px',
      }}
    >
      <div>
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
      </div>

      <Box>
        <Box>
          <Box component='form' onSubmit={handleSubmit}>
            <Box>
              <TextField
                type='number'
                variant='outlined'
                fullWidth
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                sx={{
                  border: '1px solid #FFFFFF',
                  borderRadius: '10px',
                }}
                InputProps={{
                  inputMode: 'numeric',

                  style: { color: '#FFFFFF' },
                }}
              />
              <Select value={currency} onChange={handleCurrencyChange} sx={{}}>
                <MenuItem value='EUR'>EUR</MenuItem>
                <MenuItem value='USD'>USD</MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span
                  style={{
                    background: 'yellow',
                    color: '#212121',
                    fontSize: '13px',
                    lineHeight: '20px',
                    fontWeight: '700',
                  }}
                >
                  1st
                </span>
                <Typography
                  variant='body1'
                  sx={{
                    //   color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '14px',
                    lineHeight: '21px',
                  }}
                >
                  Deposit
                </Typography>
                <svg
                  width='13'
                  height='14'
                  viewBox='0 0 13 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g opacity='0.4'>
                    <circle cx='6.5' cy='7' r='6.5' fill='#8E8E8E' />
                    <mask id='path-2-inside-1_1_427' fill='white'>
                      <path d='M6.32224 3.09241H6.28996C5.68093 3.09241 5.18542 3.56707 5.18542 4.15047C5.18542 4.73388 5.68093 5.20854 6.28996 5.20854H6.32224C6.9313 5.20854 7.42678 4.73388 7.42678 4.15047C7.42678 3.56707 6.9313 3.09241 6.32224 3.09241ZM6.32224 4.75H6.28996C5.94486 4.75 5.66413 4.48107 5.66413 4.15049C5.66413 3.81992 5.94486 3.55099 6.28996 3.55099H6.32224C6.66734 3.55099 6.94807 3.81992 6.94807 4.15049C6.94807 4.48107 6.66734 4.75 6.32224 4.75Z' />
                      <path d='M7.18745 5.61913H5.42478C5.29261 5.61913 5.18542 5.7218 5.18542 5.84841V10.0355C5.18542 10.1621 5.29261 10.2648 5.42478 10.2648H7.18745C7.31962 10.2648 7.4268 10.1621 7.4268 10.0355V5.84841C7.4268 5.72178 7.31962 5.61913 7.18745 5.61913ZM6.9481 9.80626H5.66413V6.07769H6.9481V9.80626Z' />
                    </mask>
                    <path
                      d='M6.9481 9.80626V10.8063H7.9481V9.80626H6.9481ZM5.66413 9.80626H4.66413V10.8063H5.66413V9.80626ZM5.66413 6.07769V5.07769H4.66413V6.07769H5.66413ZM6.9481 6.07769H7.9481V5.07769H6.9481V6.07769ZM6.32224 2.09241H6.28996V4.09241H6.32224V2.09241ZM6.28996 2.09241C5.16959 2.09241 4.18542 2.97471 4.18542 4.15047H6.18542C6.18542 4.14999 6.18415 4.141 6.20106 4.1248C6.21866 4.10793 6.24837 4.09241 6.28996 4.09241V2.09241ZM4.18542 4.15047C4.18542 5.32623 5.16959 6.20854 6.28996 6.20854V4.20854C6.24837 4.20854 6.21866 4.19301 6.20106 4.17615C6.18415 4.15995 6.18542 4.15095 6.18542 4.15047H4.18542ZM6.28996 6.20854H6.32224V4.20854H6.28996V6.20854ZM6.32224 6.20854C7.44265 6.20854 8.42678 5.32622 8.42678 4.15047H6.42678C6.42678 4.15097 6.42805 4.15996 6.41114 4.17615C6.39355 4.19301 6.36385 4.20854 6.32224 4.20854V6.20854ZM8.42678 4.15047C8.42678 2.97472 7.44265 2.09241 6.32224 2.09241V4.09241C6.36385 4.09241 6.39355 4.10793 6.41114 4.12479C6.42805 4.14098 6.42678 4.14997 6.42678 4.15047H8.42678ZM6.32224 3.75H6.28996V5.75H6.32224V3.75ZM6.28996 3.75C6.4562 3.75 6.66413 3.88871 6.66413 4.15049H4.66413C4.66413 5.07343 5.43352 5.75 6.28996 5.75V3.75ZM6.66413 4.15049C6.66413 4.41227 6.4562 4.55099 6.28996 4.55099V2.55099C5.43352 2.55099 4.66413 3.22756 4.66413 4.15049H6.66413ZM6.28996 4.55099H6.32224V2.55099H6.28996V4.55099ZM6.32224 4.55099C6.156 4.55099 5.94807 4.41227 5.94807 4.15049H7.94807C7.94807 3.22756 7.17868 2.55099 6.32224 2.55099V4.55099ZM5.94807 4.15049C5.94807 3.88872 6.156 3.75 6.32224 3.75V5.75C7.17868 5.75 7.94807 5.07343 7.94807 4.15049H5.94807ZM7.18745 4.61913H5.42478V6.61913H7.18745V4.61913ZM5.42478 4.61913C4.78127 4.61913 4.18542 5.12944 4.18542 5.84841H6.18542C6.18542 6.31416 5.80395 6.61913 5.42478 6.61913V4.61913ZM4.18542 5.84841V10.0355H6.18542V5.84841H4.18542ZM4.18542 10.0355C4.18542 10.7545 4.78126 11.2648 5.42478 11.2648V9.26482C5.80395 9.26482 6.18542 9.56979 6.18542 10.0355H4.18542ZM5.42478 11.2648H7.18745V9.26482H5.42478V11.2648ZM7.18745 11.2648C7.83096 11.2648 8.4268 10.7545 8.4268 10.0355H6.4268C6.4268 9.56979 6.80828 9.26482 7.18745 9.26482V11.2648ZM8.4268 10.0355V5.84841H6.4268V10.0355H8.4268ZM8.4268 5.84841C8.4268 5.12935 7.8309 4.61913 7.18745 4.61913V6.61913C6.80835 6.61913 6.4268 6.3142 6.4268 5.84841H8.4268ZM6.9481 8.80626H5.66413V10.8063H6.9481V8.80626ZM6.66413 9.80626V6.07769H4.66413V9.80626H6.66413ZM5.66413 7.07769H6.9481V5.07769H5.66413V7.07769ZM5.9481 6.07769V9.80626H7.9481V6.07769H5.9481Z'
                      fill='#212121'
                      mask='url(#path-2-inside-1_1_427)'
                    />
                  </g>
                </svg>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant='body1'
                  sx={{ fontSize: '14px', lineHeight: '21px', color: '8E8E8E' }}
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
            <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
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
                disabled={!checked}
                sx={{
                  width: '320px',
                  border: 'none',
                  background: '#F3302A',
                  fontWeight: '700',
                  margin: '15px 0 15px 0',
                }}
              >
                DEPOSIT NOW
              </Button>
            </Box>
          </Box>
        </Box>
        <Typography variant='body1' sx={{ textAlign: 'center' }}>
          Have a promo code?{' '}
          <span style={{ color: '#F3302A', cursor: 'pointer' }}>
            Click here
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default DepositModal;
