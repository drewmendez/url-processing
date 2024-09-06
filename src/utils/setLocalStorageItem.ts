export const setLocalStorageItem = (
  key: string,
  value: string[],
  input: string
) => {
  if (value.includes(input)) {
    value.splice(value.indexOf(input), 1);
  }
  value.unshift(input);
  value.length > 5 && value.pop();
  localStorage.setItem(key, JSON.stringify(value));
};
