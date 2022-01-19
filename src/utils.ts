import { DateTime } from "luxon";

const frenchMonths = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const lastNmonths = (n: number): string[] => {
  const currentMonth = new Date().getMonth();
  const months = [];

  for (let i = 0; i < n; ++i) {
    months.push(frenchMonths.at(currentMonth - i) ?? "?");
  }
  return months;
};

export const formatDate = (date: Date): string => {
  return DateTime.fromJSDate(date).toFormat("dd/MM/yyyy HH:mm:ss");
};

export const hashCode = (str: string): number => {
  return str.split("").reduce((prevHash: number, currVal: string) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
};

export const hashColor = (str: string): string => {
  return `hsl(${hashCode(str) % 360}, 100%, 50%)`;
};
