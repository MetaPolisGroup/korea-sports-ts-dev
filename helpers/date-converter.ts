const CheckDigitsFormatTime = (time: string) => {
  if (time.length < 2) {
    time = "0" + time;
  }
  return time;
};

export const DateConverter = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const dateFormat =
    CheckDigitsFormatTime((date.getMonth() + 1).toString()) +
    "-" +
    CheckDigitsFormatTime(date.getDate().toString()) +
    " " +
    CheckDigitsFormatTime(date.getHours().toString()) +
    ":" +
    CheckDigitsFormatTime(date.getMinutes().toString());

  return dateFormat;
};
