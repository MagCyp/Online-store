export const restrictNumberToString = (count: number): string => {
  const checker = 99;

  if (count > checker) {
    return `${checker}+`;
  }

  return count.toString();
};
