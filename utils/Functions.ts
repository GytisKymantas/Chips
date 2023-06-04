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