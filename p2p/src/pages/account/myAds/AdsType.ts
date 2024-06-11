export type ICryptoCurrency = {
  address: string;
  coin: string;
};
export type IFiatCurrency = {
  symbol: string;
  nationality: string;
};

export type AdsObj = {
  type: string;
  asset: string;
  token_address: string;
  token_decimal: number;
  token_logo: string;
  fiat: { currency: string; name: string; logo: string };
  price_type: string;
  price: number;
  chainId: number;
  crypto_amount: number;
  limit_min: number;
  limit_max: number;
  status: string;
  duration: number;
  terms: string;
  auto_reply: string;
  price_percent?: number;
};
export type IBankDetails = {
  name: string;
  account: string;
  bank: string;
};

export type IorderInput = {
  type: string;
  asset: string;
  fiat: string;
  price_type: string;
  price: number;
  crypto_amount: number;
  limit_min: number;
  limit_max: number;
  status: string;
  duration: number;
  terms: string;
  auto_reply: string;
};
