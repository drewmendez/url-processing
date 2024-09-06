export const sortDescending = (key: string) => {
  return key
    .split("")
    .sort(function (a: string, b: string) {
      const lowerA = a.toLowerCase();
      const lowerB = b.toLowerCase();

      if (lowerA !== lowerB) return lowerB.localeCompare(lowerA);
      if (a === lowerA && b !== lowerB) return -1;
      if (a !== lowerA && b === lowerB) return 1;
      return 0;
    })
    .join("");
};
