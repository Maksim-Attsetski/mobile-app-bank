export const getExchangesDate = (
  exchangesDate: string
): {
  day: string | number;
  time: string;
} => {
  const splittedDate = exchangesDate.split(' ');

  const date = new Date(splittedDate[0]);
  const time = splittedDate[1].split(':');

  return {
    day: date.getDate(),
    time: `${time[0]}:${time[1]}`,
  };
};
