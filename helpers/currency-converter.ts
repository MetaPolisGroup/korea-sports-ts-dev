export const CurrencyConverter = (price: number) => {
  const priceFormated = new Intl.NumberFormat().format(price);
  return priceFormated;
};
