import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CrossedIcon from '../../public/crossedIcon';
import InformationIcon from '../../public/informationIcon';
import { addDeposit } from '../../store/reducers/counter';
import {
  USDfloat,
  EUROfloat,
  values,
  fromNumbers,
  backgrounds,
  ModalTypes,
} from '../../utils/ModalData';
import BonusBox from './BonusBox';
import CounterType from '../../types';
import InformationBlock from './InformationBlock';
import {
  BONUS_RANGE_1,
  BONUS_RANGE_2,
  BONUS_RANGE_3,
  BONUS_RANGE_4,
} from '../../utils/Constants';

interface DepositModal {
  setModal: Dispatch<SetStateAction<string>>;
}

const DepositModal: React.FC<DepositModal> = ({ setModal }) => {
  const dispatch = useDispatch();

  const [currency, setCurrency] = useState('USD');
  const [checked, setChecked] = useState(false);
  const [selectedBox, setSelectedBox] = useState(0);
  const [value, setValue] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const counter = useSelector((state) => state) as CounterType;

  const handleToggle = () => {
    setChecked(!checked);
  };

  const handleMultiplier = (depositNumber: number) => {
    if (depositNumber === 1) {
      return 2;
    }
    if (depositNumber === 2) {
      return 2.1;
    }
    if (depositNumber === 3) {
      return 2.2;
    }
    if (depositNumber === 4) {
      return 2.7;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const depositNumber = await counter.counter.active_modal;
    const amount =
      currency === 'USD'
        ? parseFloat(value)
        : Math.round(parseFloat(value) * USDfloat);

    let multipliedAmount = 0;

    let rangeArray;

    switch (depositNumber) {
      case 1:
        rangeArray = BONUS_RANGE_1;
        break;
      case 2:
        rangeArray = BONUS_RANGE_2;
        break;
      case 3:
        rangeArray = BONUS_RANGE_3;
        break;
      case 4:
        rangeArray = BONUS_RANGE_4;
        break;
      default:
        rangeArray = BONUS_RANGE_1;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 1000); // Use setTimeout to wait for the next event loop tick
    });

    if (
      selectedBox === 1 &&
      amount >= rangeArray[selectedBox - 1]?.from_1 &&
      amount <= rangeArray[selectedBox - 1]?.to_1
    ) {
      multipliedAmount = amount * 1;
    } else if (
      selectedBox === 2 &&
      amount >= rangeArray[selectedBox - 1]?.from_2 &&
      amount <= rangeArray[selectedBox - 1]?.to_2
    ) {
      multipliedAmount = amount * 1.5;
    } else if (
      selectedBox === 3 &&
      amount >= rangeArray[selectedBox - 1]?.from_3 &&
      amount <= rangeArray[selectedBox - 1]?.to_3
    ) {
      multipliedAmount = amount * handleMultiplier(depositNumber);
    } else if (
      selectedBox === 3 &&
      amount > rangeArray[0].to_1 &&
      amount < rangeArray[2].from_3
    ) {
      multipliedAmount = amount * 1.5;
    } else {
      multipliedAmount = amount;
    }

    dispatch(addDeposit({ depositNumber, amount: multipliedAmount.toFixed() }));
    setModal(ModalTypes.ClaimModal);
  };

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;

    if (currency === 'EUR' && selectedCurrency === 'USD') {
      setCurrency(selectedCurrency);
      const convertedValue = Math.round(Number(value) * USDfloat).toFixed(0);
      setValue(String(convertedValue));
    } else if (currency === 'USD' && selectedCurrency === 'EUR') {
      setCurrency(selectedCurrency);
      const convertedValue = Math.round(Number(value) * EUROfloat).toFixed(0);
      setValue(String(convertedValue));
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
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => setModal(ModalTypes.Initial)}
          >
            <CrossedIcon />
          </Box>
        </Box>
        <Box sx={{ marginBottom: '47px' }}>
          <Typography
            variant='body1'
            sx={{
              fontWeight: '400',
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
                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                      {
                        '-webkit-appearance': 'none',
                        margin: 0,
                      },
                    '& input[type=number]': {
                      '-moz-appearance': 'textfield',
                    },
                    '& input': {
                      fontWeight: 700,
                      fontSize: '32px',
                      lineHeight: '48px',
                      padding: '5px 0 5px 20px',
                    },
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
                    '& .MuiSelect-icon': {
                      color: '#FFFFFF',
                    },
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
                  <Typography
                    component='span'
                    style={{
                      background: backgrounds[counter.counter.active_modal],
                      color: '#212121',
                      fontSize: '13px',
                      lineHeight: '20px',
                      fontWeight: '700',
                      padding: '1px 9px',
                      borderRadius: '5px',
                    }}
                  >
                    {counter.counter.active_modal}st
                  </Typography>
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
                  <Box
                    sx={{
                      marginTop: '4px',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <InformationIcon />
                    {isHovered && (
                      <Box
                        sx={{ position: 'absolute', left: '50px', zIndex: '4' }}
                      >
                        <InformationBlock
                          depositNumber={counter.counter.active_modal}
                        />
                      </Box>
                    )}
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
                    sx={{
                      '& .MuiSwitch-thumb': {
                        backgroundColor: '#FFFFF0',
                      },
                      '& .Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#39D493',
                      },
                    }}
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
                {values.map((_, index) => (
                  <Box key={index} onClick={() => setSelectedBox(index + 1)}>
                    <BonusBox
                      disabled={checked}
                      index={index + 1}
                      selectedBox={selectedBox}
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
            <Typography
              component='span'
              style={{
                color: '#F3302A',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              Click here
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DepositModal;
