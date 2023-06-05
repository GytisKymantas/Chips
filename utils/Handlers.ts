export const handleDepositNumber = (index: number) => {
    if (index === 1) {
      return `${index}st deposit`;
    } else if (index === 2) {
      return `${index}nd deposit`;
    } else if (index === 3) {
      return `${index}rd deposit`;
    } else if (index === 4) {
      return `${index}th deposit`;
    }
  };

  export const handlePercentage = (depositNumber: number) => {
    if (depositNumber === 1) {
      return '200';
    }
    if (depositNumber === 2) {
      return '210';
    }
    if (depositNumber === 3) {
      return '220';
    }
    if (depositNumber === 4) {
      return '270';
    }
  };