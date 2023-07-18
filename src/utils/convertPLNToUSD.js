export const convertPLNToUSD = (PLN) => {

  if (PLN === undefined || typeof PLN === 'string') {
    return NaN;
  } else if (typeof PLN !== 'number') {
    return 'Error';
  } else if (PLN <= 0) {
    PLN = 0;
  }
  
  const PLNtoUSD = PLN / 3.5;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}