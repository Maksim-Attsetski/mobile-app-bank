type TPrice = number | string;

export interface IExchange {
  EURCARD_in: TPrice;
  EURCARD_out: TPrice;
  RUBCARD_EURCARD_in: TPrice;
  RUBCARD_EURCARD_out: TPrice;
  RUBCARD_in: TPrice;
  RUBCARD_out: TPrice;
  USDCARD_EURCARD_in: TPrice;
  USDCARD_EURCARD_out: TPrice;
  USDCARD_RUBCARD_in: TPrice;
  USDCARD_RUBCARD_out: TPrice;
  USDCARD_in: TPrice;
  USDCARD_out: TPrice;
  kurs_date_time: string;
}
