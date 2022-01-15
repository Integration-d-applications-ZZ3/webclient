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
  return [date.getDate().toString().padStart(2, "0"),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getFullYear()].join("/")
  + " " + [date.getHours().toString().padStart(2, "0"),
    date.getMinutes().toString().padStart(2, "0"),
    date.getSeconds().toString().padStart(2, "0")].join(":");
};
