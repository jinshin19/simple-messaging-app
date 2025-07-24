export const timeFormatter = (dateParam: string) => {
  const date = new Date(dateParam);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  const formatted = `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;

  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    ampm,
    timeFormat: `${hours}:${minutes}:${ampm}`,
    fullFormat: formatted,
  };
};
