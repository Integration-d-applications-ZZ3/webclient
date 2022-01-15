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
