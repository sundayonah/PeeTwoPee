export const getAddress = (currency: Currency | undefined | String) => {
  return currency?.isNative
    ? WNATIVEADDRESSES[currency?.chainId as number]
    : currency?.wrapped.address;
};
