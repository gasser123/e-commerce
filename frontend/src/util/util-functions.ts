export const addDecimal = (num: number) =>
  parseFloat((Math.round(num * 100) / 100).toFixed(2));
