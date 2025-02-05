const twoDigitsFormat = (value: number): string =>
  value.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

export { twoDigitsFormat };
