export const countE = (value: object) => {
  return Object.keys(value)
    .join("")
    .split("")
    .reduce((acc, curr) => {
      if (curr === "e" || curr === "E") {
        return acc + 1;
      }
      return acc;
    }, 0);
};
