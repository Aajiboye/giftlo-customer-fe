export const formatNumber = (value: string | number) => {
  if (!value) return '0';
  return new Intl.NumberFormat().format(Number(value));
};

