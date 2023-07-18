import { convertPLNToUSD } from './../convertPLNtoUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });

  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('abc')).toBeNaN();
    expect(convertPLNToUSD('-543')).toBeNaN();
  });

  it('should return NaN when no arguments are passed', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });

  it('should return Error when arguments other than string or number passed', () => {
    expect(convertPLNToUSD(new Date())).toEqual('Error');
    expect(convertPLNToUSD(true)).toEqual('Error');
    expect(convertPLNToUSD(false)).toEqual('Error');
    expect(convertPLNToUSD([])).toEqual('Error');
    expect(convertPLNToUSD({})).toEqual('Error');
    expect(convertPLNToUSD(null)).toEqual('Error');
    expect(convertPLNToUSD(() => {})).toEqual('Error');
  });

  it('should return $0.00 when number 0 or less is passed', () => {
    expect(convertPLNToUSD(0)).toBe('$0.00');
    expect(convertPLNToUSD(-0)).toBe('$0.00');
    expect(convertPLNToUSD(-1)).toBe('$0.00');
    expect(convertPLNToUSD(-Infinity)).toBe('$0.00');
  });
});